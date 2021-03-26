import mongoose, {Schema} from 'mongoose';

export default interface ISymbolModel extends mongoose.Document {
  id_user: Schema.Types.ObjectId;
  symbol: Schema.Types.String;
  event_time: Schema.Types.Number;
  open_time: Schema.Types.Number;
  close_time: Schema.Types.Number;
  open_price: Schema.Types.Decimal128;
  close_price: Schema.Types.Decimal128;
  high_price: Schema.Types.Decimal128;
  low_price: Schema.Types.Decimal128;
  volume: Schema.Types.Number;
  open: Schema.Types.Boolean;
  createdAt: Schema.Types.Date;
}
