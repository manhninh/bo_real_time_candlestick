import BlockRepository from '@src/repository/BlockRepository';
import {EMITS} from '@src/socketHandlers/EmitType';
import {Socket} from 'socket.io';
import {TradingCandles} from './ITradingSystem';

const ethusdt: TradingCandles = (socket) => (data) => {
  socket.join('ethusdt');
  const blockRes = new BlockRepository();
  blockRes.blockEthShowChart().then((ethBlocks) => {
    socket.emit(EMITS.BLOCKS_ETHUSDT, ethBlocks);
  });
};

export default (socket: Socket) => ({
  ethusdt: ethusdt(socket),
});
