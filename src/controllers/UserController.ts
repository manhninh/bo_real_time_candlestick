import UserBussiness from '@src/business/UserBussiness';
import IUserModel from '@src/models/cpUser/IUserModel';
import {contants} from '@src/utils';
import {AddUser, EditUser, GetUser, TransferMoneyUser, WalletUser} from '@src/validator/users/users.validator';
import {AvailableWalletUser} from '@src/validator/users/users_money.validator';
import {NextFunction, Request, Response} from 'express';
export default class UserController {
  public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = (req.user as IUserModel)._id;
      // const params = req.query;
      const userBusiness = new UserBussiness();
      const data = new GetUser();
      data._id = id.toString();
      const result = await userBusiness.findById(data);
      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async getUserByIdAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // const id = (req.user as IUserModel)._id;
      const params = req.query;
      const userBusiness = new UserBussiness();
      const data = new GetUser();
      data._id = params._id.toString();
      const result = await userBusiness.findById(data);
      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async getUserByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // const id = (req.user as IUserModel).id;
      const params = req.body;
      const userBusiness = new UserBussiness();
      // const data = new GetExpertByName();
      // data.username = params.username;
      const result = await userBusiness.findByName(params.username, params.page, params.size);
      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async getListUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      const userBusiness = new UserBussiness();
      const result = await userBusiness.getListUsers(params.page, params.size);
      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      const data = new AddUser();
      data.fullname = params.fullname;
      data.username = params.username;
      data.password = params.password;
      data.email = params.email;
      data.phone = params.phone;
      data.avatar = params.avatar;
      data.total_amount = params.total_amount;
      data.is_virtual = params.is_virtual;
      data.status = contants.STATUS.ACTIVE;
      data.status_trading_copy = contants.STATUS.ACTIVE;
      const userBusiness = new UserBussiness();
      const result = await userBusiness.addUser(data);

      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async transferMoney(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      const data = new TransferMoneyUser();
      data.id_user = (req.user as IUserModel).id;
      data.source = params.source;
      data.amount = Number(params.amount);
      const userBusiness = new UserBussiness();
      const result = await userBusiness.transferMoney(data);

      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async viewWalletHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      const data = new WalletUser();
      data.id_user = (req.user as IUserModel).id;
      const userBusiness = new UserBussiness();
      const result = await userBusiness.viewWalletHistory(data, params.page, params.size);

      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async viewWalletHistoryAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      const data = new WalletUser();
      data.id_user = params.id_user;
      const userBusiness = new UserBussiness();
      const result = await userBusiness.viewWalletHistory(data, params.page, params.size);

      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async getAvailableMoney(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      const data = new AvailableWalletUser();
      data.id_user = (req.user as IUserModel).id;
      data.source = params.source;
      const userBusiness = new UserBussiness();
      const result = await userBusiness.getAvailableMoney(data);

      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }

  public async autoGenerateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      if (!params.number) {
        throw new Error('Number is required');
      } else {
        const userBusiness = new UserBussiness();
        const faker = require('faker');

        for (let i = 0; i < params.number; i++) {
          const fullname = faker.name.findName();
          const username = faker.internet.userName().toLowerCase();
          const email = faker.internet.email().toLowerCase();
          const phone = faker.phone.phoneNumber();
          const total_amount = Math.floor(Math.random() * (3000 - 500)) + 500;

          const data = new AddUser();

          data.fullname = fullname;
          data.username = username;
          data.password = username;
          data.email = email;
          data.phone = phone;
          data.avatar = '';
          data.total_amount = total_amount;
          data.is_virtual = true;
          data.status = contants.STATUS.ACTIVE;
          data.status_trading_copy = contants.STATUS.ACTIVE;
          userBusiness.addUser(data);
        }
      }

      res.status(200).send({data: true});
    } catch (err) {
      next(err);
    }
  }

  public async editUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      const data = new EditUser();
      data._id = params._id;
      data.fullname = params.fullname;
      data.username = params.username;
      data.email = params.email;
      data.phone = params.phone;
      data.avatar = params.avatar;
      data.total_amount = params.total_amount;
      data.is_virtual = params.is_virtual;
      const userBusiness = new UserBussiness();
      const result = await userBusiness.editUser(data);

      res.status(200).send({data: result});
    } catch (err) {
      next(err);
    }
  }
}
