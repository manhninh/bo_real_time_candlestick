import {PROTECT_STATUS} from '@src/contants/system';
import BlockRepository from '@src/repository/blockRepository';
import LastResultRepository from '@src/repository/lastResultRepository';
import {IBlockModel} from 'bo-trading-common/lib/models/blocks';
import {ILastResultModel} from 'bo-trading-common/lib/models/lastResults';
import {logger} from 'bo-trading-common/lib/utils';
import moment from 'moment';
import {EMITS} from '../socketHandlers/emitType';

export default class HeartBeat {
  private _blockRes: BlockRepository;
  private _lastResutlRes: LastResultRepository;

  constructor() {
    this._blockRes = new BlockRepository();
    this._lastResutlRes = new LastResultRepository();
    this._init();
  }

  private _init() {
    // giá trị close được set làm giá trị open của nến tiếp theo
    let closeToOpen = null;
    let hPrice = null;
    let lPrice = null;
    let totalVolume = null;
    setInterval(() => {
      if (!global.candlestick) return;
      // nếu hiện tại chưa có thông tin nến thì lấy từ biến global ra
      this._candlestick = global.candlestick;

      // cộng dồn volume
      if (!totalVolume) totalVolume = global.candlestick.v;
      // nếu volume tổng nhỏ hơn 1500 thì cộng dồn không thì thôi
      if (totalVolume <= 1500) totalVolume += global.candlestick.v;

      // gán lại giá trị close của nến trước cho giá trị open của nến hiện tại
      this._candlestick.o = closeToOpen || global.candlestick.o;

      // gán giá trị close hiện tại vào biến để so sánh
      this._candlestick.c = global.candlestick.c;

      // gán lại giá trị hight price khi so sánh với kết quả cuối cùng của nến
      if (hPrice) hPrice = this._candlestick.c >= hPrice ? this._candlestick.c : hPrice;
      else hPrice = this._candlestick.o;
      // gán giá trị high nến
      this._candlestick.h = hPrice;

      // gán lại giá trị low price
      if (lPrice) lPrice = this._candlestick.c <= lPrice ? this._candlestick.c : lPrice;
      else lPrice = this._candlestick.o;

      // gán giá trị low nến
      this._candlestick.l = lPrice;

      // tính năng bảo vệ sàn
      if (global.protectBO === PROTECT_STATUS.BUY_WIN) {
        if (this._candlestick.o >= this._candlestick.c) {
          const rangeData = this._candlestick.o - this._candlestick.c;
          const fake = this._randomRange(this._candlestick.c, this._candlestick.o);
          this._candlestick.c += Math.round((rangeData + fake) * 100) / 100;
        }
      } else if (global.protectBO === PROTECT_STATUS.SELL_WIN) {
        if (this._candlestick.o <= this._candlestick.c) {
          const rangeData = this._candlestick.c - this._candlestick.o;
          const fake = this._randomRange(this._candlestick.o, this._candlestick.c);
          this._candlestick.c -= Math.round((rangeData + fake) * 100) / 100;
        }
      }

      // gán giá trị close nến

      const timeTick = moment(new Date()).unix() % 60;

      // dữ liệu trả về phía client mỗi giây
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

      /** cách 30s lưu giá trị vào bảng block 1 lần */
      if (timeTick === 0 || timeTick === 30) {
        closeToOpen = data.candlestick.close;
        hPrice = null;
        lPrice = null;

        const blockModel = <IBlockModel>{
          symbol: 'ethusdt',
          event_time: new Date(moment(data.candlestick.event_time).subtract(30, 'seconds').toString())
            .getTime()
            .toString(),
          open: data.candlestick.open,
          close: data.candlestick.close,
          high: data.candlestick.high,
          low: data.candlestick.low,
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
