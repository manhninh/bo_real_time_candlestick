import ISymbolModel from '@src/models/symbols/ISymbolModel';
import mongoose, {Schema} from 'mongoose';

class SymbolSchema {
  static get schema() {
    const schema = new mongoose.Schema(
      {
        symbol: {type: Schema.Types.String, required: true},
        event_time: {type: Schema.Types.Number, required: true},
        open_time: {type: Schema.Types.Number, required: true},
        close_time: {type: Schema.Types.Number, required: true},
        open_price: {type: Schema.Types.Decimal128, required: true},
        close_price: {type: Schema.Types.Decimal128, required: true},
        high_price: {type: Schema.Types.Decimal128, required: true},
        low_price: {type: Schema.Types.Decimal128, required: true},
        volume: {type: Schema.Types.Number, required: true},
        open: {type: Schema.Types.Boolean, required: true},
      },
      {
        timestamps: true,
      },
    );
    return schema;
  }
}

export default mongoose.model<ISymbolModel>('symbols', SymbolSchema.schema);
