import IRealUserModel from '@src/models/cpRealUser/IRealUserModel';
import mongoose, {Schema} from 'mongoose';
class UserSchema {
  static get schema() {
    const schema = new mongoose.Schema({
      full_name: {type: Schema.Types.String, default: ''},
      username: {type: Schema.Types.String, required: true, unique: true},
      email: {type: Schema.Types.String, index: true, required: true, unique: true},
      password: {type: Schema.Types.String, required: true},
      email_verify_at: {type: Schema.Types.Date, required: false, default: null},
      phone: {type: Schema.Types.String},
      country_id: {type: Schema.Types.ObjectId, required: false},
      amount: {type: Schema.Types.Decimal128, required: false, default: 0},
      is_ib: {type: Schema.Types.Boolean, required: false, default: false},
      buy_ib_at: {type: Schema.Types.Date, required: false, default: null},
      commission_ib: {type: Schema.Types.Number, required: false},
      commission_ref: {type: Schema.Types.Number, required: false},
      commission_matrix: {type: Schema.Types.Number, required: false},
      commission_botAI: {type: Schema.Types.Number, required: false},
      is_root_sponsor: {type: Schema.Types.Boolean, required: false, default: false},
      sponsor_id: {type: Schema.Types.ObjectId, ref: 'users'},
      sponsor_path: [{type: Schema.Types.ObjectId, ref: 'users'}],
      withdraw_blocked_at: {type: Schema.Types.Date, required: false},
      login_blocked_at: {type: Schema.Types.Date, required: false},
      tfa_secret: {type: Schema.Types.String, required: false, default: null},
      is_tfa_enabled: {type: Schema.Types.Boolean, required: false, default: false},
      verify_code: {type: Schema.Types.String, required: false, default: null},
      main_acc_id: {type: Schema.Types.ObjectId, ref: 'users'},
      is_fake_user: {type: Schema.Types.Boolean, required: false, default: false},
      token: {type: Schema.Types.String},
      blockedAt: {type: Schema.Types.Date, required: false},
      eth_address: {type: Schema.Types.String, required: false, default: null},
      eth_address_password: {type: Schema.Types.String, required: false, default: null},
      eth_address_seed: {type: Schema.Types.String, required: false, default: null},
      eth_address_private_key: {type: Schema.Types.String, required: false, default: null},
      deposits: [{type: Schema.Types.ObjectId, ref: 'Deposit'}],
      withdraws: [{type: Schema.Types.ObjectId, ref: 'Withdraw'}],
      is_auto_upgrade_matrix: {type: Schema.Types.Boolean, required: false, default: true},
      matrix_package_ids: [{type: Schema.Types.ObjectId, required: false, ref: 'matrix_packages'}],
      matrix_withdraw_back: {type: Schema.Types.Number, required: false, default: 0},
      login_code: {type: Schema.Types.String, required: false, default: null},
      verify_failed: {type: Schema.Types.Number, required: false, default: 0},
      login_code_lastest: {type: Schema.Types.Date, required: false, default: null},
      receivedBonusAt: {type: Schema.Types.Date, required: false, default: null},
      showBonusAt: {type: Schema.Types.Date, required: false, default: null},
    });
    return schema;
  }
}

export default mongoose.model<IRealUserModel>('user', UserSchema.schema);
