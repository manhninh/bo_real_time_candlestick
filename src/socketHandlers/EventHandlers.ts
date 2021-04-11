import {logger} from 'bo-trading-common/lib/utils';
import {Server, Socket} from 'socket.io';
import {ExtendedError} from 'socket.io/dist/namespace';
import TradingWebEvents from './events/tradingWeb';
import TradingWebRooms from './rooms/tradingWeb';

export default (io: Server) => {
  try {
    global.io = io;
    io.use(async (socket: Socket, next: (err?: ExtendedError) => void) => {
      try {
        logger.info('Socket connect token');
        const token = socket.handshake.query['token'];
        if (token) {
          //   const accessTokenRes = new AccessTokenRepository();
          //   const accessToken = await accessTokenRes.findOne({token});
          //   const userRepository = new UserRepository();
          //   const realUserRepository = new RealUserRepository();
          //   const expertRepository = new ExpertRepository();
          //   const expert = await expertRepository.findById(accessToken.id_client);
          //   if (!expert) {
          //     const realUser = await realUserRepository.findById(accessToken.id_client);
          //     if (realUser) socket['userId'] = realUser.id;
          //     else {
          //       const user = await userRepository.findById(accessToken.id_client);
          //       if (user) socket['userId'] = user.id_user_trading;
          //     }
          //   } else socket['userId'] = expert.id;
        }
        next();
      } catch (error) {
        logger.error(`SOCKET AUTHORIZE ERROR: ${error.message}`);
      }
    });

    io.on('connection', (socket: Socket) => {
      logger.info(`SOCKET CONNECTION SUCCESS: ${socket.id}`);
      const roomHandlers = [TradingWebRooms(socket)];
      roomHandlers.forEach((handler) => {
        for (const roomName in handler) {
          socket.on(roomName, handler[roomName]);
        }
      });
      const eventHandlers = [TradingWebEvents(socket)];
      eventHandlers.forEach((handler) => {
        for (const eventName in handler) {
          socket.on(eventName, handler[eventName]);
        }
      });
    });
  } catch (error) {
    logger.error(`SOCKET CONNECT ERROR: ${error.message}`);
  }
};
