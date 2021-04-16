import config from '@src/config';
import { logger } from 'bo-trading-common/lib/utils';
import WebSocket from 'ws';

export default class CandlestickStreams {
  _baseEndpoint: string = '';
  _ws: WebSocket = null;

  constructor(baseEndpoint: string) {
    this._baseEndpoint = baseEndpoint;
    this._connectWebSocket();
  }

  private _connectWebSocket() {
    this._ws = new WebSocket(this._baseEndpoint);

    this._ws.onopen = () => {
      logger.info(`WebSocket connected to ${this._baseEndpoint}\n`);
      var hello = {
        type: 'hello',
        heartbeat: true,
        apikey: config.WS_COIN_API_KEY,
        subscribe_data_type: ['ohlcv'],
        subscribe_filter_symbol_id: [
          'BINANCE_SPOT_ETH_USDT',
          'COINBASE_SPOT_ETH_USDC',
          'KRAKEN_SPOT_ETH_USDT',
          'HUOBI_SPOT_ETH_USDT',
          'BITFINEX_SPOT_ETH_USDT',
        ],
        subscribe_filter_asset_id: ['ETH'],
        subscribe_filter_period_id: ['1SEC'],
      };
      this._ws.send(JSON.stringify(hello));
    };

    this._ws.onmessage = (msg: WebSocket.MessageEvent) => {
      try {
        const data = JSON.parse(msg.data.toString());
        if (data) {
          if (data.type == "hearbeat") return;
          global.candlestick = {
            o: Number(data.price_open),
            c: Number(data.price_close),
            h: Number(data.price_high),
            l: Number(data.price_low),
            v: Number(data.volume_traded) + Number(data.trades_count),
          };
        } else {
          logger.warn(`WebSocket to ${this._baseEndpoint} not data: ${msg.data.toString()}\n`);
        }
      } catch (e) {
        logger.error(`WebSocket to ${this._baseEndpoint} parse message failed\n`, e);
      }
    };

    this._ws.onclose = () => {
      logger.warn(`WebSocket to ${this._baseEndpoint} closed. Reconnect will be attempted in 1 second\n`);
      setTimeout(function () {
        new CandlestickStreams(config.WS_COIN_API_ENDPOINT);
      }, 1000);
    };

    this._ws.onerror = (err: WebSocket.ErrorEvent) =>
      logger.error(`WebSocket to ${this._baseEndpoint} error`, err, '\n');
  }
}
