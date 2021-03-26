import {Schema} from 'mongoose';
import ISymbolModel from './ISymbolModel';

export default class SymbolModel {
  private _symbolModel: ISymbolModel;

  constructor(ISymbolModel: ISymbolModel) {
    this._symbolModel = ISymbolModel;
  }

  get symbol(): Schema.Types.String {
    return this._symbolModel.symbol;
  }

  get event_time(): Schema.Types.Number {
    return this._symbolModel.event_time;
  }

  get open_time(): Schema.Types.Number {
    return this._symbolModel.open_time;
  }

  get close_time(): Schema.Types.Number {
    return this._symbolModel.close_time;
  }

  get open_price(): Schema.Types.Decimal128 {
    return this._symbolModel.open_price;
  }

  get close_price(): Schema.Types.Decimal128 {
    return this._symbolModel.close_price;
  }

  get high_price(): Schema.Types.Decimal128 {
    return this._symbolModel.high_price;
  }

  get low_price(): Schema.Types.Decimal128 {
    return this._symbolModel.low_price;
  }

  get volume(): Schema.Types.Number {
    return this._symbolModel.volume;
  }

  get open(): Schema.Types.Boolean {
    return this._symbolModel.open;
  }

  get createdAt(): Schema.Types.Date {
    return this._symbolModel.createdAt;
  }
}
