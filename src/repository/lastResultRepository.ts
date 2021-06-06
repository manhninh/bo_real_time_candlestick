import {ILastResultModel} from 'bo-trading-common/lib/models/lastResults';
import {LastResultSchema} from 'bo-trading-common/lib/schemas';
import {RepositoryBase} from './base';

export default class LastResultRepository extends RepositoryBase<ILastResultModel> {
  constructor() {
    super(LastResultSchema);
  }

  public async getLastRecord(): Promise<ILastResultModel> {
    try {
      const result = await LastResultSchema.findOne().limit(1).sort({group: -1, el_number: -1});
      return result;
    } catch (err) {
      throw err;
    }
  }

  public async totalLastResults(): Promise<any[]> {
    try {
      const result = await LastResultSchema.aggregate([
        {
          $group: {
            _id: '$group',
            el_number: {
              $push: {
                el_number: '$el_number',
                result: '$result',
              },
            },
          },
        },
        {$sort: {_id: -1}},
        {$limit: 5},
        {$unwind: '$el_number'},
        {
          $group: {
            _id: '$_id',
            el_number: {
              $push: '$el_number.result',
            },
          },
        },
        {
          $sort: {_id: -1},
        },
      ]);
      return result.reverse();
    } catch (err) {
      throw err;
    }
  }
}
