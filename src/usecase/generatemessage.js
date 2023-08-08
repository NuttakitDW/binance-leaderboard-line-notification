const getPosition = require("../data/getposition");
const getTrader = require("../data/gettrader");
const unixTimeToLocalThaiDateTime = require("../usecase/thaitime");
const timeAgoFromUnixTimestamp = require("../usecase/timediff");
const Trader = require("../entity/trader");

/**
 * @param {Trader} trader
 * @param {Position[]} positions
 * @returns {string}
 */
async function generateMessage(trader, positions) {
  try {
    let msg = "Positions-USDⓈ-M\n\n"
    for (let i = 0; i < positions.length; i++) {
      const symbol = positions[i].symbol
      const position = positions[i].long ? "Long" : "Short";
      const leverage = positions[i].leverage
      const size = positions[i].amount
      const entryPrice = positions[i].entryPrice
      const markPrice = positions[i].markPrice
      const pnl = positions[i].pnl
      const roe = positions[i].roe * 100
      const timestamp = positions[i].tradeStart
      const dateTime = unixTimeToLocalThaiDateTime(timestamp)
      const timeAgo = timeAgoFromUnixTimestamp(timestamp)

      msg += `Trader: ${trader.name}\n`
      msg += `Symbol: ${symbol} Perpetual\n`
      msg += `Position: ${position} ${leverage}X\n`
      msg += `Size: ${size} USD\n`
      msg += `Entry Price: ${entryPrice.toFixed(7)} USD\n`
      msg += `Mark Price: ${markPrice.toFixed(7)} USD\n`
      msg += `PNL (ROE %): ${pnl.toFixed(2)} USD (${roe.toFixed(2)}%)\n`
      msg += `Time: ${dateTime} (${timeAgo})\n\n`      
    }
    msg += "Disclaimer: This is information – not financial advice or recommendation.\n"
    msg += `Powered By Nuttakit Kundum - 2023`
    return msg;
  } catch (error) {
    console.error(error);
  }
}

module.exports = generateMessage;
