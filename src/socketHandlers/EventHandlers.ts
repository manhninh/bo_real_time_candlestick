import logger from '@src/middleware/Logger';
import { Server, Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { AppData, SocketHandler } from './EventTypes';

const app: AppData = {
  allSockets: [],
};

export default (io: Server) => {
  try {
    io.use(async (socket: Socket, next: (err?: ExtendedError) => void) => {
      try {
        logger.info('Socket connect token');
        // const token = socket.handshake.query['token'];
        // if (token) {
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
        // }
        next();
      } catch (error) {
        logger.error(`SOCKET AUTHORIZE ERROR: ${error.message}`);
      }
    });

    io.on('connection', (socket: SocketHandler<any, any>) => {
      logger.info('Socket Connection Success');
    });

    io.on('connect_error', (error) => {
      logger.error(`Socket Connect Error: ${error}`);
    });

    io.on('error', (error) => {
      logger.error(`Socket Error: ${error}`);
    });

    io.on('disconnect', (reason) => {
      logger.error(`Socket Disconnected: ${reason}`);
    });
  } catch (error) {
    logger.error(`SOCKET CONNECT ERROR: ${error.message}`);
  }
};
