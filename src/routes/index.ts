import {Router} from 'express';

class MainRoutes {
  public routers: Router;

  constructor() {
    this.routers = Router();
    this.config();
  }

  private config() {}
}

export default new MainRoutes().routers;
