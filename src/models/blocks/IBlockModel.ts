import {Document} from 'mongoose';

export default interface IBlockModel extends Document {
  symbol: string;
  event_time: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  is_open: boolean;
}
