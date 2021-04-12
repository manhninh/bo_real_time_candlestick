import {Socket} from 'socket.io';

type TradingCandlesData = {};

export type TradingCandles = (socket: Socket) => (data: TradingCandlesData) => void;
