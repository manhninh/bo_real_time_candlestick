import IBlockModel from '@src/models/blocks/IBlockModel';
import mongoose, {Schema} from 'mongoose';

class BlockSchema {
  static get schema() {
    const schema = new mongoose.Schema({
      symbol: {type: Schema.Types.String, required: true},
      event_time: {type: Schema.Types.Date, required: true},
      open: {type: Schema.Types.Number, required: true},
      close: {type: Schema.Types.Number, required: true},
      high: {type: Schema.Types.Number, required: true},
      low: {type: Schema.Types.Number, required: true},
      volume: {type: Schema.Types.Number, required: true},
      is_open: {type: Schema.Types.Boolean, required: true},
    });
    return schema;
  }
}

export default mongoose.model<IBlockModel>('blocks', BlockSchema.schema);
