import express from 'express';
import HeartBeat from './candlestickStreams/heartBeat';
import Indicator from './indicator';
import LastResultRepository from './repository/lastResultRepository';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.init();
    /** lắng nghe dữ liệu nến trả về từ các sàn (Binance,...) để xử lý nến */
    new HeartBeat();
    new Indicator();
    /** cronjob */
  }

  private async init() {
    const lastResutlRes = new LastResultRepository();
    const lastRecord = await lastResutlRes.getLastRecord();
    if (lastRecord) {
      global.lastGroup = lastRecord.el_number == 16 ? lastRecord.group + 1 : lastRecord.group;
      global.lastNumber = lastRecord.el_number == 16 ? 1 : lastRecord.el_number + 1;
    } else {
      global.lastGroup = 1;
      global.lastNumber = 1;
    }
  }
}

export default new App().app;
