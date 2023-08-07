/**
 * Represents a trading position.
 * @class
 */
class Trader {
  /**
   * Create a new Position instance.
   * @param {string} name
   * @param {string} encryptedUid
   */
  constructor(
    name,
    encryptedUid
  ) {
    this.name = name;
    this.encryptedUid = encryptedUid;
  }
}

module.exports = Trader;



