import IBlockModel from '@src/models/blocks/IBlockModel';
import BlockRepository from '@src/repository/BlockRepository';
import moment from 'moment';

export default class HeartBeat {
  private _blockRes: BlockRepository;

  constructor() {
    this._blockRes = new BlockRepository();
    this._init();
  }

  private _init() {
    setInterval(() => {
      if (!global.candlestick) return;
      /** nếu hiện tại chưa có thông tin nến thì lấy từ biến global ra */
      if (!this._candlestick) this._candlestick = global.candlestick;

      /** so sánh nếu chưa có dữ liệu mới từ sàn (binance,...) trả về thì tự chế dữ liệu */
      if (this._candlestick.time === global.candlestick.time) {
        const average = (this._candlestick.c + global.candlestick.o) / 2;
        const round = Math.round(average * 100) / 100;
        const newClose = Math.abs(round - global.candlestick.o);
        const candlestickClose = Math.round(newClose * 100) / 100;
        this._candlestick.c += candlestickClose;
      } else {
        this._candlestick = global.candlestick;
      }
      const timeTick = moment(new Date()).unix() % 60;
      const eventTime = Math.floor(Date.now() / 1000) * 1000;
      const data = [
        {
          time: eventTime,
          open: this._candlestick.o,
          close: this._candlestick.c,
          high: this._candlestick.h,
          low: this._candlestick.l,
          volume: this._candlestick.v,
          is_open: timeTick <= 30 ? true : false,
        },
        timeTick,
      ];
      /** emit to room ethusdt */
      global.io.to('ethusdt').emit('real_data', data);
      /** cách 30s lưu giá trị vào bảng block 1 lần */
      if (timeTick === 0 || timeTick === 30) {
        const _blockModel = <IBlockModel>{
          symbol: 'ethusdt',
          event_time: eventTime.toString(),
          open: this._candlestick.o,
          close: this._candlestick.c,
          high: this._candlestick.h,
          low: this._candlestick.l,
          volume: this._candlestick.v,
          is_open: timeTick <= 30 ? true : false,
        };
        this._blockRes.create(_blockModel);
      }
    }, 1000);
  }

  private _candlestick: {
    time: number;
    o: number;
    c: number;
    h: number;
    l: number;
    v: number;
  };
}
