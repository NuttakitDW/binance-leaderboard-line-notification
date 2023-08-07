const getUid = require("./getuid");
const Trader = require("../entity/trader");

/** @type {Trader[]} */
var traders = [];

/**
 * @param {string} name
 * @returns {Trader}
 */
async function getTrader(name) {
  try {
    if (traders[name] === undefined) {
      const uid = await getUid(name);
      traders[name] = new Trader(name, uid);
    }
    return traders[name];
  } catch (error) {
    console.error(error);
  }
}

module.exports = getTrader;
