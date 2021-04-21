import BlockRepository from '@src/repository/blockRepository';
import {EMITS} from '@src/socketHandlers/emitType';
import {logger} from 'bo-trading-common/lib/utils';
import {Socket} from 'socket.io';
import {TradingCandles} from './ITradingWeb';

const ethusdt: TradingCandles = (socket) => (data) => {
  socket.join('ethusdt');
  const blockRes = new BlockRepository();
  // show chart
  blockRes
    .blockEthShowChart()
    .then((ethBlocks) => {
      socket.emit(EMITS.BLOCKS_ETHUSDT, ethBlocks);
    })
    .catch((err) => {
      logger.error(`Block ETHUSDT load fail: ${err.message}`);
      socket.emit(EMITS.BLOCKS_ETHUSDT, []);
    });

  // show result
  blockRes
    .blockEthResult()
    .then((ethResult) => {
      socket.emit(EMITS.RESULT_ETHUSDT, ethResult);
    })
    .catch((err) => {
      logger.error(`Block ETHUSDT load fail: ${err.message}`);
      socket.emit(EMITS.RESULT_ETHUSDT, []);
    });
};

const indicator_ethusdt: TradingCandles = (socket) => (data) => {
  socket.join('indicator_ethusdt');
};

export default (socket: Socket) => ({
  ethusdt: ethusdt(socket),
  indicator_ethusdt: indicator_ethusdt(socket),
});
