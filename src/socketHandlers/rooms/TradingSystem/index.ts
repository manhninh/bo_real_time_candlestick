import {AppData, SocketHandler} from '../../EventTypes';
import {TradingCandles} from './ITradingSystem';

const ethusdt: TradingCandles = (app, socket) => (data) => {
  console.log(data, 'data');
};

export default (app: AppData, socket: SocketHandler<any, any>) => ({
  ethusdt: ethusdt(app, socket),
});
