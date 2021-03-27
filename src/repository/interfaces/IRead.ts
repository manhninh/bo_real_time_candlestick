import mongoose from 'mongoose';

export default interface IRead<T extends mongoose.Document> {
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
