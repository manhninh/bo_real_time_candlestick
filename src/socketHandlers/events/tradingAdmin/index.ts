import { Socket } from 'socket.io';
import { TradingCandles } from './ITradingAdmin';

const protectStatus: TradingCandles = (socket) => (data: number) => {
  global.protectBO = data;
};

export default (socket: Socket) => ({
  protectStatus: protectStatus(socket),
});
