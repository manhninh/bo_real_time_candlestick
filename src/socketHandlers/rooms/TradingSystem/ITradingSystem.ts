import {AppData, SocketHandler} from '../../EventTypes';

type TradingCandlesData = {};
export type TradingCandles = (
  app: AppData,
  socket: SocketHandler<TradingCandlesData, {}>,
) => (data: TradingCandlesData) => void;
