import {AppData, SocketHandler} from '../../EventTypes';
import {TradingCandles} from './ITradingSystem';

const commit: TradingCandles = (app, socket) => (data) => {
  console.log(data, 'data');
  // socket.emit('transaction', data);
};

export default (app: AppData, socket: SocketHandler<any, any>) => ({
  commit: commit(app, socket),
});
