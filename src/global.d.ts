declare module NodeJS {
  interface Global {
    /** dữ liệu nến */
    candlestick: {
      time: number;
      o: number;
      c: number;
      h: number;
      l: number;
      v: number;
      Q: number;
    };
    /** socket */
    io: any;
    /** bảo vệ sàn */
    protectBO: number;
  }
}
