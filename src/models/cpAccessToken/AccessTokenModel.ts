import IAccessTokenModel from './IAccessTokenModel';

export default class AccessTokenModel {
  private _AccessTokenModel: IAccessTokenModel;

  constructor(AccessTokenModel: IAccessTokenModel) {
    this._AccessTokenModel = AccessTokenModel;
  }
  get client_id(): string {
    return this._AccessTokenModel.client_id;
  }

  get token(): string {
    return this._AccessTokenModel.token;
  }

  get id_client(): string {
    return this._AccessTokenModel.id_client;
  }

  get type(): string {
    return this._AccessTokenModel.type;
  }

  get createdAt(): Date {
    return this._AccessTokenModel.createdAt;
  }

  get updatedAt(): Date {
    return this._AccessTokenModel.updatedAt;
  }
}
