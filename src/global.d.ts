declare module NodeJS {
  interface Global {
    candlestick: {
      time: number;
      o: number;
      c: number;
      h: number;
      l: number;
      v: number;
      Q: number;
    };
    io: any;
  }
}
