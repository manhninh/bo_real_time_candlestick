import {random} from '@src/utils/utilities';
import moment from 'moment';
import {EMITS} from '../socketHandlers/emitType';

export default class IndicatorEthUsdt {
  constructor() {
    this._init();
  }

  private _init() {
    let oscillatorsBuy = 0;
    let oscillatorsNeutral = 0;
    let oscillatorsSell = 0;
    let maBuy = 0;
    let maNeutral = 0;
    let maSell = 0;
    let macdBuy = 0;
    let macdNeutral = 0;
    let macdSell = 0;
    let totalBuy = 0;
    let totalNeutral = 0;
    let totalSell = 0;
    let indicator_type = 0;
    let indicator = 0;

    setInterval(() => {
      const timeTick = moment(new Date()).unix() % 60;
      if (timeTick > 29) return;
      if (timeTick < 29) {
        oscillatorsBuy += random(5, 10);
        oscillatorsNeutral += random(5, 10);
        oscillatorsSell += random(5, 10);
        maBuy += random(5, 10);
        maNeutral += random(5, 10);
        maSell += random(5, 10);
        macdBuy += random(5, 10);
        macdNeutral += random(5, 10);
        macdSell += random(5, 10);
        totalBuy = oscillatorsBuy + maBuy + macdBuy;
        totalNeutral = macdNeutral + macdNeutral + macdNeutral;
        totalSell = oscillatorsSell + maSell + macdSell;
        if (totalBuy >= totalNeutral && totalBuy > totalSell) {
          indicator_type = random(100, 380);
        } else if (totalNeutral > totalBuy && totalNeutral > totalSell) {
          indicator_type = random(400, 600);
        } else if (totalSell >= totalNeutral && totalSell > totalBuy) {
          indicator_type = random(700, 900);
        }
        indicator = random(50, 70);
      } else {
        oscillatorsBuy = 0;
        oscillatorsNeutral = 0;
        oscillatorsSell = 0;
        maBuy = 0;
        maNeutral = 0;
        maSell = 0;
        macdBuy = 0;
        macdNeutral = 0;
        macdSell = 0;
        totalBuy = 0;
        totalNeutral = 0;
        totalSell = 0;
        indicator_type = 0;
        indicator = 0;
      }
      /** emit to room indicator_ethusdt */
      global.io?.sockets.in('indicator_ethusdt').emit(EMITS.INDICATOR_ETHUSDT, {
        oscillatorsBuy,
        oscillatorsNeutral,
        oscillatorsSell,
        maBuy,
        maNeutral,
        maSell,
        macdBuy,
        macdNeutral,
        macdSell,
        totalBuy,
        totalNeutral,
        totalSell,
        indicator_type,
        indicator,
      });
    }, 4000);
  }
}
