import {IBlockModel} from 'bo-trading-common/lib/models/blocks';
import {BlockSchema} from 'bo-trading-common/lib/schemas';
import {RepositoryBase} from './base';

export default class BlockRepository extends RepositoryBase<IBlockModel> {
  constructor() {
    super(BlockSchema);
  }

  public async blockEthShowChart(): Promise<IBlockModel[]> {
    try {
      const result = await BlockSchema.find({symbol: 'ethusdt'}).sort({event_time: -1}).limit(108);
      return result.reverse();
    } catch (err) {
      throw err;
    }
  }

  public async blockEthResult(): Promise<any[]> {
    try {
      const result = await BlockSchema.aggregate([
        {
          $match: {
            symbol: 'ethusdt',
            is_open: false,
          },
        },
        {
          $sort: {event_time: -1},
        },
        {
          $limit: 80,
        },
        {
          $project: {
            _id: 0,
            result: {
              $cond: {if: {$gt: ['$open', '$close']}, then: true, else: false},
            },
          },
        },
      ]);
      return result.reverse();
    } catch (err) {
      throw err;
    }
  }
}
