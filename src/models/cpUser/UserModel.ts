import IUserModel from './IUserModel';

export default class UserModel {
  private _userModel: IUserModel;

  constructor(UserModel: IUserModel) {
    this._userModel = UserModel;
  }
  get fullname(): string {
    return this._userModel.fullname;
  }

  get username(): string {
    return this._userModel.username;
  }

  get email(): string {
    return this._userModel.email;
  }

  get phone(): string {
    return this._userModel.phone;
  }

  get avatar(): string {
    return this._userModel.avatar;
  }

  get total_amount(): number {
    return this._userModel.total_amount;
  }

  get is_virtual(): boolean {
    return this._userModel.is_virtual;
  }

  get status(): string {
    return this._userModel.status;
  }

  get status_trading_copy(): string {
    return this._userModel.status_trading_copy;
  }

  get blockedAt(): Date {
    return this._userModel.blockedAt;
  }
}
