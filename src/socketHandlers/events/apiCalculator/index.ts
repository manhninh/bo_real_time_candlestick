import {PROTECT_STATUS} from '@src/contants/system';
import {Socket} from 'socket.io';

const protectStatus = (socket: Socket) => (data: PROTECT_STATUS) => {
  console.log(data, 'data');
  global.protectBO = data;
};

export default (socket: Socket) => ({
  protectStatus: protectStatus(socket),
});
