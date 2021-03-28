import {AppData, SocketHandler} from '../../EventTypes';
import {TradingCandles} from './ITradingSystem';

const protectStatus: TradingCandles = (app, socket) => (data: number) => {
  console.log(data, 'data');
  global.protectBO = data;
};

export default (app: AppData, socket: SocketHandler<any, any>) => ({
  protectStatus: protectStatus(app, socket),
});
