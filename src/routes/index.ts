import {isAuthenticated} from '@src/middleware/auth/oAuth2';
import {Router} from 'express';
import AdminsRouter from './admins';
import CommissionRefLog from './commissionRefLog';
import ExpertsRouter from './experts';
import TradingCopyRouter from './tradingCopy';
import TradingGainRouter from './tradingGain';
import TradingHistoryRouter from './tradingHistory';
import TradingOrderRouter from './tradingOrder';
import UsersRouter from './users';
import WalletRouter from './wallet';

class MainRoutes {
  public routers: Router;

  constructor() {
    this.routers = Router();
    this.config();
  }

  private config() {
    this.routers.use('/users', isAuthenticated, new UsersRouter().router);
    this.routers.use('/trading_history', isAuthenticated, new TradingHistoryRouter().router);
    this.routers.use('/trading_copy', isAuthenticated, new TradingCopyRouter().router);
    this.routers.use('/trading_order', isAuthenticated, new TradingOrderRouter().router);
    this.routers.use('/experts', isAuthenticated, new ExpertsRouter().router);
    this.routers.use('/admins', isAuthenticated, new AdminsRouter().router);
    this.routers.use('/trading_gain', isAuthenticated, new TradingGainRouter().router);
    this.routers.use('/wallet', isAuthenticated, new WalletRouter().router);
    this.routers.use('/commission_ref', isAuthenticated, new CommissionRefLog().router);
  }
}

export default new MainRoutes().routers;
