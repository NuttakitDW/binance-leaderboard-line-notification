const Status = require("../constant/enum");
/**
 * Represents a trading position.
 * @class
 */
class Position {
  /**
   * Create a new Position instance.
   * @param {string} symbol - The trading symbol.
   * @param {string} status - The trading status.
   * @param {number} entryPrice - The entry price of the position.
   * @param {number} markPrice - The mark price of the position.
   * @param {number} pnl - The profit and loss of the position.
   * @param {number} roe - The return on equity of the position.
   * @param {number} amount - The amount of the position.
   * @param {boolean} tradeBefore - Indicates if the trader has traded before.
   * @param {boolean} long - Indicates if the position is long.
   * @param {boolean} short - Indicates if the position is short.
   * @param {number} leverage - The leverage used in the position.
   * @param {number} tradeStart - The unix time of the position.
   * @param {number} updatedTime - The unix time of the updatedTime.
   */
  constructor(
    symbol,
    status,
    entryPrice,
    markPrice,
    pnl,
    roe,
    amount,
    tradeBefore,
    long,
    short,
    leverage,
    tradeStart,
    updatedTime
  ) {
    this.symbol = symbol;
    this.status = status;
    this.entryPrice = entryPrice;
    this.markPrice = markPrice;
    this.pnl = pnl;
    this.roe = roe;
    this.amount = amount;
    this.tradeBefore = tradeBefore;
    this.long = long;
    this.short = short;
    this.leverage = leverage;
    this.tradeStart = tradeStart;
    this.updatedTime = updatedTime;
  }
}

module.exports = Position;
