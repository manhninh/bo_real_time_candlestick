import { logger } from 'bo-trading-common/lib/utils';
import { Socket } from 'socket.io';
import { TradingCandles } from './ITradingWeb';

const disconnect: TradingCandles = (_socket) => (reason) => {
  logger.warn(`SOCKET DISCONNECT: ${reason}`);
};

export default (socket: Socket) => ({
  disconnect: disconnect(socket),
});
