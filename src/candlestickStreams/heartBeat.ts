import { PROTECT_STATUS } from '@src/contants/system';
import BlockRepository from '@src/repository/blockRepository';
import { formatter2 } from '@src/utils/utilities';
import { IBlockModel } from 'bo-trading-common/lib/models/blocks';
import moment from 'moment';
import { EMITS } from '../socketHandlers/emitType';

export default class HeartBeat {
  private _blockRes: BlockRepository;

  constructor() {
    this._blockRes = new BlockRepository();
    this._init();
  }

  private _init() {
    /** giá trị close được set làm giá trị open của nến tiếp theo */
    let closeToOpen = null;
    let hPrice = null;
    let lPrice = null;
    setInterval(() => {
      if (!global.candlestick) return;
      /** nếu hiện tại chưa có thông tin nến thì lấy từ biến global ra */
      this._candlestick = global.candlestick;

      /** gán lại giá trị close của nến trước cho giá trị open của nến hiện tại */
      this._candlestick.o = closeToOpen || global.candlestick.o;

      /** gán lại giá trị hight price */
      if (hPrice) hPrice = global.candlestick.h >= hPrice ? global.candlestick.h : hPrice;
      else hPrice = closeToOpen || global.candlestick.o;
      this._candlestick.h = hPrice;

      /** gán lại giá trị low price */
      if (lPrice) lPrice = global.candlestick.l <= lPrice ? global.candlestick.l : lPrice;
      else lPrice = closeToOpen || global.candlestick.o;
      this._candlestick.l = lPrice;

      // TODO: tính năng bảo vệ sàn
      if (global.protectBO === PROTECT_STATUS.BUY_WIN) {
        if (this._candlestick.o > global.candlestick.c) {
          const rangeData = this._candlestick.o - global.candlestick.c;
          const fake = this._randomRange(this._candlestick.c, this._candlestick.o);
          this._candlestick.c += rangeData + fake;
        }
      } else if (global.protectBO === PROTECT_STATUS.SELL_WIN) {
      }

      const timeTick = moment(new Date()).unix() % 60;

      /** nếu ở giây thứ 0 hoặc 30 thì sẽ lấy giá trị close lưu lại  */
      if (timeTick === 0 || timeTick === 30) {
        closeToOpen = this._candlestick.c > global.candlestick.c ? this._candlestick.c : global.candlestick.c;
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
          volume: formatter2.format(this._candlestick.v),
          is_open: timeTick < 30 ? true : false,
        },
        timeTick,
      };
      /** emit to room ethusdt */
      global.io.sockets.in('ethusdt').emit(EMITS.ETHUSDT_REALTIME, data);

      /** cách 30s lưu giá trị vào bảng block 1 lần */
      if (timeTick === 0 || timeTick === 30) {
        if (timeTick === 0) {
          const buySell = this._candlestick.o > this._candlestick.c ? 0 : 1;
          global.io.sockets.in('ethusdt').emit(EMITS.RESULT_BUY_SELL, buySell);
          global.protectBO = PROTECT_STATUS.NORMAL;
        }
        const _blockModel = <IBlockModel>{
          symbol: 'ethusdt',
          event_time: new Date(moment(eventTime).subtract(30, 'seconds').toString()).getTime().toString(),
          open: this._candlestick.o,
          close: this._candlestick.c,
          high: this._candlestick.h,
          low: this._candlestick.l,
          volume: Number(formatter2.format(this._candlestick.v)),
          is_open: timeTick < 30 ? true : false,
        };
        this._blockRes.create(_blockModel);
      }
    }, 1000);
  }

  private _randomRange = (valueOne: number, valueTwo: number) => {
    const average = (valueOne + valueTwo) / 2;
    const round = Math.round(average * 100) / 100;
    const newClose = Math.abs(round - valueTwo);
    const range = Math.round(newClose * 100) / 100;
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
