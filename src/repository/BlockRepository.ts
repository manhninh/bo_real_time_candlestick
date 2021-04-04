import IBlockModel from '@src/models/blocks/IBlockModel';
import BlockSchema from '@src/schemas/BlockSchema';
import {RepositoryBase} from './base';

export default class BlockRepository extends RepositoryBase<IBlockModel> {
  constructor() {
    super(BlockSchema);
  }
}
