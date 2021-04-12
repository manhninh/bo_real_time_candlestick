import {logger} from 'bo-trading-common/lib/utils';

export default (date: Date) => {
  try {
    /** xử lý đánh các lệnh được order trước từ admin */
    // const tradingOrderBussiness = new TradingOrderBussiness();
    // tradingOrderBussiness.executeListPendingOrders(date);
  } catch (error) {
    logger.error(`\nSCHEDULER ERROR: `);
    logger.error(`${error.message}\n`);
  }
};
