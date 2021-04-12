import {errorMiddleware, notFoundMiddleware} from 'bo-trading-common/lib/utils';
import {json, urlencoded} from 'body-parser';
import compression from 'compression';
import express from 'express';
import routes from './routes';
import Scheduler from './schedulers';
import HeartBeat from './socketHandlers/candlestickStreams/HeartBeat';
import Indicator from './socketHandlers/indicator';

class App {
  public app: express.Application;
  public scheduler: Scheduler;

  constructor() {
    this.app = express();
    this.config();
    /** lắng nghe dữ liệu nến trả về từ các sàn (Binance,...) để xử lý nến */
    new HeartBeat();
    new Indicator();
    /** cronjob */
    new Scheduler().config();
  }

  private config() {
    // this.app.use(cors({origin: '*', methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS']}));
    this.app.use(compression());

    /** support application/json type post data */
    this.app.use(json({limit: '10MB'}));
    this.app.use(urlencoded({extended: true}));

    /** add routes */
    this.app.use('/api/v1', routes);

    /** not found error */
    this.app.use(notFoundMiddleware);

    /** internal server Error  */
    this.app.use(errorMiddleware);
  }
}

export default new App().app;
