import {IBlockModel} from 'bo-trading-common/lib/models/blocks';
import {BlockSchema} from 'bo-trading-common/lib/schemas';
import {RepositoryBase} from './base';

export default class BlockRepository extends RepositoryBase<IBlockModel> {
  constructor() {
    super(BlockSchema);
  }

  public async blockEthShowChart(): Promise<IBlockModel[]> {
    try {
      const result = await BlockSchema.find({symbol: 'ethusdt'}).sort({event_time: -1}).limit(110);
      return result.reverse();
    } catch (err) {
      throw err;
    }
  }
}
