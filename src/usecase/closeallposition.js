const generateMessage = require("../usecase/generatemessage");
const Trader = require("../entity/trader");
const MIN = require("../constant/constant");
const Status = require("../constant/enum");

/**
 * @param {Trader} trader
 * @returns {string[]}
 */
async function closeAllPosition(trader) {
  try {
    const messages = [];

    for (let symbol in trader.positions) {
      const now = Date.now();

      trader.positions[symbol].status = Status.CLOSE;
      trader.positions[symbol].updatedTime = now;
      const msg = await generateMessage(trader, trader.positions[symbol]);
      messages.push(msg);
      delete trader.positions[symbol];
    }
    return messages;
  } catch (error) {
    console.error(error);
  }
}

module.exports = closeAllPosition;
