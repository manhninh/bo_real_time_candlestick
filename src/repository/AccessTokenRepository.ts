import IAccessTokenModel from '@src/models/cpAccessToken/IAccessTokenModel';
import CPAccessTokenSchema from '@src/schemas/CPAccessTokenSchema';
import {RepositoryBase} from './base';

export default class AccessTokenRepository extends RepositoryBase<IAccessTokenModel> {
  constructor() {
    super(CPAccessTokenSchema);
  }
}
