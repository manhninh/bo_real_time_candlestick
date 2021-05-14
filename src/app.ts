import express from 'express';
import HeartBeat from './candlestickStreams/heartBeat';
import Indicator from './indicator';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    /** lắng nghe dữ liệu nến trả về từ các sàn (Binance,...) để xử lý nến */
    new HeartBeat();
    new Indicator();
    /** cronjob */
  }
}

export default new App().app;
