import mongoose, {FilterQuery, Schema, UpdateQuery} from 'mongoose';
import IRead from '../interfaces/IRead';
import IWrite from '../interfaces/IWrite';

export class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {
  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  public async findById(id: string): Promise<T> {
    try {
      const result = await this._model.findById(id);
      return result as T;
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async findAll(): Promise<T[]> {
    try {
      const result = await this._model.find({});
      return result as T[];
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async findWithPaging(page: number, size: number): Promise<any> {
    try {
      const result = await this._model
        .find({})
        .limit(parseInt(size.toString()))
        .skip((parseInt(page.toString()) - 1) * parseInt(size.toString()));
      const count = await this._model.countDocuments({});
      return {
        result,
        count,
      };
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async findWithPagingById(item: FilterQuery<T>, page: number, size: number): Promise<any> {
    try {
      const result = await this._model
        .find(item)
        .limit(parseInt(size.toString()))
        .skip((parseInt(page.toString()) - 1) * parseInt(size.toString()));
      const count = await this._model.countDocuments(item);
      return {
        result,
        count,
      };
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async findWhere(conditions: FilterQuery<T>, projection?: any | null): Promise<T[]> {
    try {
      const result = await this._model.find(conditions, projection);
      return result as T[];
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async findWhereSortByField(item: FilterQuery<T>, field: string): Promise<T[]> {
    try {
      const result = await this._model.find(item).sort({
        [field]: 1,
      });
      return result as T[];
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async findOne(item: FilterQuery<T>): Promise<T> {
    try {
      const result = await this._model.findOne(item);
      return result as T;
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async findOneWithSelect(item: FilterQuery<T>, select: string): Promise<T> {
    try {
      const result = await this._model.findOne(item).select(select);
      return result as T;
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async create(item: T): Promise<T> {
    try {
      const result = await this._model.create(item);
      return result as T;
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async update(id: Schema.Types.ObjectId, item: UpdateQuery<T>): Promise<T> {
    try {
      const result = await this._model.updateOne({_id: id}, item);
      return result as T;
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public async delete(id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      await this._model.deleteOne({_id: id});
      return true;
    } catch (err) {
      throw err.errors ? err.errors.shift() : err;
    }
  }

  public toObjectId(id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(id);
  }
}
