import {IAccessTokenModel} from 'bo-trading-common/lib/models/accessTokens';
import {AccessTokenSchema} from 'bo-trading-common/lib/schemas';
import {RepositoryBase} from './base';

export default class AccessTokenRepository extends RepositoryBase<IAccessTokenModel> {
  constructor() {
    super(AccessTokenSchema);
  }

  public async findByToken(token: string): Promise<IAccessTokenModel> {
    try {
      const result = await AccessTokenSchema.findOne({token});
      return result;
    } catch (err) {
      throw err;
    }
  }
}
