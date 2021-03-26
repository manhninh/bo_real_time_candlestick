import IBlockModel from '@src/models/blocks/IBlockModel';
import mongoose, {Schema} from 'mongoose';

class BlockSchema {
  static get schema() {
    const schema = new mongoose.Schema({
      block_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'symbols',
      },
      symbol: {type: Schema.Types.String, required: true},
    });
    return schema;
  }
}

export default mongoose.model<IBlockModel>('blocks', BlockSchema.schema);
