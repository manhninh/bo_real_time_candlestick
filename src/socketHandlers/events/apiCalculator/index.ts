import {PROTECT_STATUS} from '@src/contants/system';
import {Socket} from 'socket.io';

const protectStatus = (_socket: Socket) => (protectStatus: PROTECT_STATUS) => {
  global.protectBO = protectStatus;
};

export default (socket: Socket) => ({
  protectStatus: protectStatus(socket),
});
