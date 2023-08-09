const Position = require("../entity/position");

/**
 * Represents a trading position.
 * @class
 */
class Trader {
  /**
   * Create a new Trader instance.
   * @param {string} name
   * @param {string} encryptedUid
   */
  constructor(name, encryptedUid) {
    /**
     * The positions associated with the trader.
     * @type {Object.<string, Position>}
     */
    this.positions = new Map();
    this.name = name;
    this.encryptedUid = encryptedUid;
  }
}

module.exports = Trader;
