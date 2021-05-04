import {IUserModel} from 'bo-trading-common/lib/models/users';
import {UserSchema} from 'bo-trading-common/lib/schemas';
import {RepositoryBase} from './base';

export default class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}
