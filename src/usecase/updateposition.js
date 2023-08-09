const generateMessage = require("../usecase/generatemessage");
const timeDiffFromUnixTimestamp = require("../usecase/timediff");
const Trader = require("../entity/trader");
const Position = require("../entity/position");
const MIN = require("../constant/constant");
const Status = require("../constant/enum");

/**
 * @param {Trader} trader
 * @param {Position[]} positions
 * @returns {string[]}
 */
async function updatePosition(trader, positions) {
  try {
    const messages = [];
    const activePositions = [];

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
      const symbol = position.symbol;
      const timestamp = position.tradeStart;
      const timeDiff = timeDiffFromUnixTimestamp(timestamp);

      if (!trader.positions.hasOwnProperty(symbol) && timeDiff <= 100 * MIN) {
        const msg = await generateMessage(trader, position);
        messages.push(msg);
      }
      trader.positions[symbol] = position;
      activePositions.push(symbol);
    }

    for (let symbol in trader.positions) {
      if (!activePositions.includes(symbol)) {
        const now = Date.now();

        trader.positions[symbol].status = Status.CLOSE;
        trader.positions[symbol].updatedTime = now;
        const msg = await generateMessage(trader, trader.positions[symbol]);
        messages.push(msg);
        delete trader.positions[symbol];
      }
    }
    return messages;
  } catch (error) {
    console.error(error);
  }
}

module.exports = updatePosition;
