import mongoose, {FilterQuery} from 'mongoose';

export default interface IRead<T extends mongoose.Document> {
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  findWithPaging(page: number, size: number): Promise<any>;
  findWithPagingById(item: FilterQuery<T>, page: number, size: number): Promise<any>;
  findWhere(conditions: FilterQuery<T>, projection?: any | null): Promise<T[]>;
  findWhereSortByField(item: FilterQuery<T>, field: string): Promise<T[]>;
  findOne(item: FilterQuery<T>): Promise<T>;
  findOneWithSelect(item: FilterQuery<T>, select: string): Promise<T>;
}
