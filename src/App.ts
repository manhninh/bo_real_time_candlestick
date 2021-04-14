import express from 'express';
import Scheduler from './schedulers';
import HeartBeat from './socketHandlers/candlestickStreams/HeartBeat';
import Indicator from './socketHandlers/indicator';

class App {
  public app: express.Application;
  public scheduler: Scheduler;

  constructor() {
    this.app = express();
    /** lắng nghe dữ liệu nến trả về từ các sàn (Binance,...) để xử lý nến */
    new HeartBeat();
    new Indicator();
    /** cronjob */
    new Scheduler().config();
  }
}

export default new App().app;
