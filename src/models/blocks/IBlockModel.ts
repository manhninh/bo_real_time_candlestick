import mongoose, {Schema} from 'mongoose';

export default interface IBlockModel extends mongoose.Document {
  id_user: Schema.Types.ObjectId;
  block_id: Schema.Types.ObjectId;
  symbol: Schema.Types.String;
}
