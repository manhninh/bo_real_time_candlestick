import {json, urlencoded} from 'body-parser';
import compression from 'compression';
import express from 'express';
import passport from 'passport';
import {errorMiddleware, notFoundMiddleware} from './middleware/Exceptions';
import routes from './routes';
import Scheduler from './schedulers';
import HeartBeat from './socketHandlers/candlestickStreams/HeartBeat';

class App {
  public app: express.Application;
  public scheduler: Scheduler;

  constructor() {
    this.app = express();
    this.config();
    /** lắng nghe dữ liệu nến trả về từ các sàn (Binance,...) để xử lý nến */
    new HeartBeat();
    /** cronjob */
    new Scheduler().config();
  }

  private config() {
    this.app.use(express.static(`${__dirname}/wwwroot`));
    // this.app.use(cors({origin: '*', methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS']}));
    this.app.use(compression());

    /** support application/json type post data */
    this.app.use(json({limit: '10MB'}));
    this.app.use(urlencoded({extended: true}));

    /** middle-ware that initialises Passport */
    this.app.use(passport.initialize());

    /** add routes */
    this.app.use('/api/v1', routes);

    /** not found error */
    this.app.use(notFoundMiddleware);

    /** internal server Error  */
    this.app.use(errorMiddleware);
  }
}

export default new App().app;
