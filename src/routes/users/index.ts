import {Router} from 'express';
import addUser from './AddUser';
import autoGenerateUser from './AutoGenerateUser';
import editUser from './EditUser';
import GetAvailableMoney from './GetAvailableMoney';
import getListUsers from './GetListUsers';
import getById from './GetUserById';
import getUserByIdAdmin from './GetUserByIdAdmin';
import getUserByName from './GetUserByName';
import transferMoney from './TransferMoney';
import ViewWalletHistory from './ViewWalletHistory';
import ViewWalletHistoryAdmin from './ViewWalletHistoryAdmin';

export default class UserRouter {
  public router: Router = Router();

  constructor() {
    getById(this.router);
    addUser(this.router);
    editUser(this.router);
    getListUsers(this.router);
    autoGenerateUser(this.router);
    getUserByIdAdmin(this.router);
    transferMoney(this.router);
    ViewWalletHistory(this.router);
    GetAvailableMoney(this.router);
    getUserByName(this.router);
    ViewWalletHistoryAdmin(this.router);
  }
}
