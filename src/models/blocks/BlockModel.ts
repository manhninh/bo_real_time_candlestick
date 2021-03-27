import IBlockModel from './IBlockModel';

export default class BlockModel {
  private _blockModel: IBlockModel;

  constructor(obj: IBlockModel) {
    this._blockModel = obj;
  }

  get symbol(): string {
    return this._blockModel.symbol;
  }

  get event_time(): string {
    return this._blockModel.event_time;
  }

  get open(): number {
    return this._blockModel.open;
  }

  get close(): number {
    return this._blockModel.close;
  }

  get high(): number {
    return this._blockModel.high;
  }

  get low(): number {
    return this._blockModel.low;
  }

  get volume(): number {
    return this._blockModel.volume;
  }

  get is_open(): boolean {
    return this._blockModel.is_open;
  }
}
