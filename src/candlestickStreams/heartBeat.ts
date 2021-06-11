import { PROTECT_STATUS } from '@src/contants/system';
import BlockRepository from '@src/repository/blockRepository';
import LastResultRepository from '@src/repository/lastResultRepository';
import { IBlockModel } from 'bo-trading-common/lib/models/blocks';
import { ILastResultModel } from 'bo-trading-common/lib/models/lastResults';
import { logger } from 'bo-trading-common/lib/utils';
import moment from 'moment';
import { EMITS } from '../socketHandlers/emitType';

export default class HeartBeat {
  private _blockRes: BlockRepository;
  private _lastResutlRes: LastResultRepository;

  constructor() {
    this._blockRes = new BlockRepository();
    this._lastResutlRes = new LastResultRepository();
    this._init();
  }

  private _init() {
    /** giá trị close được set làm giá trị open của nến tiếp theo */
    let closeToOpen = null;
    let hPrice = null;
    let lPrice = null;
    let totalVolume = null;
    setInterval(() => {
      if (!global.candlestick) return;
      /** nếu hiện tại chưa có thông tin nến thì lấy từ biến global ra */
      this._candlestick = global.candlestick;

      /** cộng dồn volume */
      if (!totalVolume) totalVolume = global.candlestick.v;
      totalVolume += global.candlestick.v;

      /** gán lại giá trị close của nến trước cho giá trị open của nến hiện tại */
      console.log(closeToOpen, "closeToOpen");
      this._candlestick.o = closeToOpen || global.candlestick.o;

      // gán giá trị close hiện tại vào biến để so sánh
      closeToOpen = global.candlestick.c;

      /** gán lại giá trị hight price khi so sánh với kết quả cuối cùng của nến */
      if (hPrice) {
        hPrice = closeToOpen >= hPrice ? closeToOpen : hPrice;
      } else {
        hPrice = this._candlestick.o;
      }
      this._candlestick.h = hPrice;

      /** gán lại giá trị low price */
      if (lPrice) {
        lPrice = closeToOpen <= lPrice ? closeToOpen : lPrice;
      }else {
        lPrice = this._candlestick.o;
      }
      this._candlestick.l = lPrice;

      // tính năng bảo vệ sàn
      if (global.protectBO === PROTECT_STATUS.BUY_WIN) {
        console.log("buy win")
        if (this._candlestick.o > global.candlestick.c) {
          const rangeData = this._candlestick.o - global.candlestick.c;
          const fake = this._randomRange(this._candlestick.c, this._candlestick.o);
          this._candlestick.c += rangeData + fake;
        }
      } else if (global.protectBO === PROTECT_STATUS.SELL_WIN) {
        console.log("sell win")
        if (this._candlestick.o < global.candlestick.c) {
          const rangeData = global.candlestick.c - this._candlestick.o;
          const fake = this._randomRange(this._candlestick.o, this._candlestick.c);
          this._candlestick.c -= rangeData + fake;
        }
      }

      const timeTick = moment(new Date()).unix() % 60;

      /** nếu ở giây thứ 0 hoặc 30 thì sẽ lấy giá trị close lưu lại  */
      if (timeTick === 0 || timeTick === 30) {
        // closeToOpen = this._candlestick.c > global.candlestick.c ? this._candlestick.c : global.candlestick.c;
        hPrice = null;
        lPrice = null;
      }

      /** dữ liệu trả về phía client mỗi giây */
      const eventTime = Math.floor(Date.now() / 1000) * 1000;
      const data = {
        candlestick: {
          event_time: eventTime,
          open: this._candlestick.o,
          close: this._candlestick.c,
          high: this._candlestick.h,
          low: this._candlestick.l,
          volume: totalVolume,
          is_open: timeTick < 30 ? true : false,
        },
        timeTick,
      };

      /** emit to room ethusdt */
      global.io.sockets.in('ethusdt').emit(EMITS.ETHUSDT_REALTIME, data);

      if (timeTick >= 28 && timeTick <= 30 || timeTick === 0) {
        console.log("data", timeTick, {
          event_time: eventTime,
          open: this._candlestick.o,
          close: this._candlestick.c,
          high: this._candlestick.h,
          low: this._candlestick.l
        })
      }

      /** cách 30s lưu giá trị vào bảng block 1 lần */
      if (timeTick === 0 || timeTick === 30) {
        const blockModel = <IBlockModel>{
          symbol: 'ethusdt',
          event_time: new Date(moment(eventTime).subtract(30, 'seconds').toString()).getTime().toString(),
          open: this._candlestick.o,
          close: this._candlestick.c,
          high: this._candlestick.h,
          low: this._candlestick.l,
          volume: totalVolume,
          is_open: timeTick < 30 ? true : false,
        };
        if (timeTick >= 30) global.io.sockets.in('ethusdt').emit(EMITS.OPEN_TRADE, false);
        else {
          // trạng thái bvs về bình thường
          global.protectBO = PROTECT_STATUS.NORMAL;
          // emit đóng/mở trade
          global.io.sockets.in('ethusdt').emit(EMITS.OPEN_TRADE, true);
          // emit trả kết quả
          global.io.sockets.in('ethusdt').emit(EMITS.RESULT_BUY_SELL, blockModel);
          // lưu kết quả cuối cùng
          this._lastResutlRes
            .create(<ILastResultModel>{
              group: global.lastGroup,
              el_number: global.lastNumber,
              result: blockModel.open <= blockModel.close ? false : true,
            })
            .then((result: ILastResultModel) => {
              // emit đến client
              global.io.sockets.in('ethusdt').emit(EMITS.LAST_RESULT, result);
              // thay đổi biến global
              global.lastGroup = result.el_number == 16 ? result.group + 1 : result.group;
              global.lastNumber = result.el_number == 16 ? 1 : result.el_number + 1;
            })
            .catch((error) => {
              logger.error('Save last result error: ', error);
            });
        }
        this._blockRes.create(blockModel);
        totalVolume = 0;
      }
    }, 1000);
  }

  private _randomRange = (valueOne: number, valueTwo: number) => {
    const average = (valueOne + valueTwo) / 2;
    const range = Math.abs(average - valueTwo);
    return range;
  };

  private _candlestick: {
    o: number;
    c: number;
    h: number;
    l: number;
    v: number;
  };
}
