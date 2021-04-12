// import {logger} from 'bo-trading-common/lib/utils';
// import WebSocket from 'ws';

// export default class CandlestickStreams {
//   _baseEndpoint: string = '';
//   _ws: WebSocket = null;

//   constructor(baseEndpoint: string) {
//     this._baseEndpoint = baseEndpoint;
//     this._createSocket();
//   }

//   _createSocket() {
//     this._ws = new WebSocket(this._baseEndpoint);

//     this._ws.onopen = () => logger.info(`WebSocket connected to ${this._baseEndpoint}\n`);

//     this._ws.onclose = () => logger.warn(`WebSocket to ${this._baseEndpoint} closed\n`);

//     this._ws.onerror = (err: WebSocket.ErrorEvent) =>
//       logger.error(`WebSocket to ${this._baseEndpoint} error`, err, '\n');

//     this._ws.onmessage = (msg: WebSocket.MessageEvent) => {
//       try {
//         const data = JSON.parse(msg.data.toString());
//         if (data) {
//           global.candlestick = {
//             time: data.E,
//             o: Number(data.k.o),
//             c: Number(data.k.c),
//             h: Number(data.k.h),
//             l: Number(data.k.l),
//             v: Number(data.k.v),
//             Q: Number(data.k.Q),
//           };
//         } else {
//           logger.warn(`WebSocket to ${this._baseEndpoint} unprocessed method\n`);
//         }
//       } catch (e) {
//         logger.error(`WebSocket to ${this._baseEndpoint} parse message failed\n`, e);
//       }
//     };

//     this._heartBeat();
//   }

//   _heartBeat() {
//     setInterval(() => {
//       if (this._ws.readyState === WebSocket.OPEN) {
//         this._ws.ping();
//         logger.debug(`Ping server ${this._baseEndpoint}`);
//       }
//     }, 5000);
//   }
// }
