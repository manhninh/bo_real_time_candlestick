import {Schema} from 'mongoose';
import IRealUserModel from './IRealUserModel';

export default class UserModel {
  private _UserModel: IRealUserModel;

  constructor(UserModel: IRealUserModel) {
    this._UserModel = UserModel;
  }

  get full_name(): string {
    return this._UserModel.full_name;
  }

  get username(): string {
    return this._UserModel.username;
  }

  get email(): string {
    return this._UserModel.email;
  }

  get password(): string {
    return this._UserModel.password;
  }

  get email_verify_at(): Date {
    return this._UserModel.email_verify_at;
  }

  get phone(): string {
    return this._UserModel.phone;
  }

  get country_id(): string {
    return this._UserModel.country_id;
  }

  get amount(): number {
    return this._UserModel.amount;
  }

  get is_ib(): boolean {
    return this._UserModel.is_ib;
  }

  get buy_ib_at(): Date {
    return this._UserModel.buy_ib_at;
  }

  get commission_ib(): number {
    return this._UserModel.commission_ib;
  }

  get commission_ref(): number {
    return this._UserModel.commission_ref;
  }

  get commission_matrix(): number {
    return this._UserModel.commission_matrix;
  }

  get commission_botAI(): number {
    return this._UserModel.commission_botAI;
  }

  get is_root_sponsor(): boolean {
    return this._UserModel.is_root_sponsor;
  }

  get sponsor_id(): Schema.Types.ObjectId {
    return this._UserModel.sponsor_id;
  }

  get sponsor_path(): Schema.Types.ObjectId[] {
    return this._UserModel.sponsor_path;
  }

  get withdraw_blocked_at(): Date {
    return this._UserModel.withdraw_blocked_at;
  }

  get login_blocked_at(): Date {
    return this._UserModel.login_blocked_at;
  }

  get tfa_secret(): string {
    return this._UserModel.tfa_secret;
  }

  get is_tfa_enabled(): boolean {
    return this._UserModel.is_tfa_enabled;
  }

  get verify_code(): string {
    return this._UserModel.verify_code;
  }

  get main_acc_id(): string {
    return this._UserModel.main_acc_id;
  }

  get is_fake_user(): boolean {
    return this._UserModel.is_fake_user;
  }

  get token(): string {
    return this._UserModel.token;
  }

  get blockedAt(): Date {
    return this._UserModel.blockedAt;
  }

  get eth_address(): string {
    return this._UserModel.eth_address;
  }

  get eth_address_password(): string {
    return this._UserModel.eth_address_password;
  }

  get eth_address_seed(): string {
    return this._UserModel.eth_address_seed;
  }

  get eth_address_private_key(): string {
    return this._UserModel.eth_address_private_key;
  }

  get deposits(): string {
    return this._UserModel.deposits;
  }

  get withdraws(): string {
    return this._UserModel.withdraws;
  }

  get is_auto_upgrade_matrix(): boolean {
    return this._UserModel.is_auto_upgrade_matrix;
  }

  get matrix_package_ids(): string {
    return this._UserModel.matrix_package_ids;
  }

  get matrix_withdraw_back(): number {
    return this._UserModel.matrix_withdraw_back;
  }

  get login_code(): string {
    return this._UserModel.login_code;
  }

  get verify_failed(): number {
    return this._UserModel.verify_failed;
  }

  get login_code_lastest(): Date {
    return this._UserModel.login_code_lastest;
  }

  get receivedBonusAt(): Date {
    return this._UserModel.receivedBonusAt;
  }

  get showBonusAt(): Date {
    return this._UserModel.showBonusAt;
  }
}
