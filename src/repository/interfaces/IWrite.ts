import mongoose, {Schema} from 'mongoose';

export default interface IWrite<T extends mongoose.Document> {
  create(item: T): Promise<T>;
  update(id: Schema.Types.ObjectId, item: T): Promise<T>;
  delete(id: Schema.Types.ObjectId): Promise<boolean>;
}
