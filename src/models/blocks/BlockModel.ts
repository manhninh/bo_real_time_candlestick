import {Schema} from 'mongoose';
import IBlockModel from './IBlockModel';

export default class BlockModel {
  private _blockModel: IBlockModel;

  constructor(IBlockModel: IBlockModel) {
    this._blockModel = IBlockModel;
  }

  get block_id(): Schema.Types.ObjectId {
    return this._blockModel.block_id;
  }

  get symbol(): Schema.Types.String {
    return this._blockModel.symbol;
  }
}
