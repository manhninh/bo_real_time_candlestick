import {IAdminModel} from 'bo-trading-common/lib/models/admins';
import {AdminSchema} from 'bo-trading-common/lib/schemas';
import {QueryOptions, UpdateQuery} from 'mongoose';
import {RepositoryBase} from './base';

export default class AdminRepository extends RepositoryBase<IAdminModel> {
  constructor() {
    super(AdminSchema);
  }

  public async updateNewCode(id: string, salt: string, hashedPassword: string): Promise<true> {
    try {
      await AdminSchema.updateOne({_id: this.toObjectId(id)}, {salt: salt, hashed_password: hashedPassword});
      return true;
    } catch (err) {
      throw err;
    }
  }

  public async renderCodeVerify(id: string, code: string): Promise<void> {
    try {
      await AdminSchema.findByIdAndUpdate(this.toObjectId(id), {code}, {new: true, upsert: true});
    } catch (err) {
      throw err;
    }
  }

  public async getAdminById(id: string): Promise<any> {
    try {
      const admin = await AdminSchema.aggregate([
        {
          $match: {
            _id: this.toObjectId(id),
          },
        },
        {
          $project: {
            _id: 1,
            email: 1,
            isEnabledTFA: {
              $cond: [
                {
                  $ifNull: ['$tfa', false],
                },
                true,
                false,
              ],
            },
          },
        },
      ]);
      return admin;
    } catch (err) {
      throw err;
    }
  }

  public async checkCode(id: string, code): Promise<IAdminModel> {
    try {
      const admin = await AdminSchema.findOne({
        _id: this.toObjectId(id),
        code,
      });
      return admin;
    } catch (err) {
      throw err;
    }
  }

  public async updateById(id: string, update: UpdateQuery<IAdminModel>, options?: QueryOptions): Promise<IAdminModel> {
    try {
      const result = await AdminSchema.findByIdAndUpdate(this.toObjectId(id), update, options);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
