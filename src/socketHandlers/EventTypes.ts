export interface SocketHandler<OnData, EmitData> {
  on: (event: string, callback: (data: OnData) => void) => void;
  emit: (event: string, data: EmitData) => void;
  join: (event: string, callback: (data: OnData) => void) => void;
}

export type Handler = {
  [key: string]: (param: any) => void;
};

export type AppData = {
  allSockets: SocketHandler<any, any>[];
};
