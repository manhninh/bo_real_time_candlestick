import mongoose from 'mongoose';

export default interface IWrite<T extends mongoose.Document> {
  create(item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
