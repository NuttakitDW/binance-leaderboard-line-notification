const unixTimeToLocalThaiDateTime = require("../usecase/thaitime");
const timeAgoFromUnixTimestamp = require("../usecase/timeago");
const Trader = require("../entity/trader");
const MIN = require("../constant/constant");
const Status = require("../constant/enum");

/**
 * @param {Trader} trader
 * @param {Position} position
 * @returns {string}
 */
async function generateMessage(trader, position) {
  const symbol = position.symbol;
  const status = position.status;
  const orderPosition = position.long ? "Long" : "Short";
  const leverage = position.leverage;
  const size = position.amount;
  const entryPrice = position.entryPrice;
  const markPrice = position.markPrice;
  const pnl = position.pnl;
  const roe = position.roe * 100;
  const tradeStart = position.tradeStart;
  const updatedTime = position.updatedTime;

  let dateTime = "";
  let timeAgo = "";

  if (status === Status.OPEN) {
    dateTime = unixTimeToLocalThaiDateTime(tradeStart);
    timeAgo = timeAgoFromUnixTimestamp(tradeStart);
  } else {
    dateTime = unixTimeToLocalThaiDateTime(updatedTime);
    timeAgo = timeAgoFromUnixTimestamp(updatedTime);
  }

  let msg = "Positions-USDⓈ-M\n\n";
  msg += `Trader: ${trader.name}\n`;
  msg += `Symbol: ${symbol} Perpetual\n`;
  msg += `Status: ${status}\n`;
  msg += `Position: ${orderPosition} ${leverage}x\n`;
  msg += `Entry Price: ${entryPrice.toFixed(7)} USD\n`;
  msg += `Mark Price: ${markPrice.toFixed(7)} USD\n`;
  msg += `PNL (ROE %): ${pnl.toFixed(2)} USD (${roe.toFixed(2)}%)\n`;
  msg += `Time: ${dateTime} (${timeAgo})\n\n`;
  msg +=
    "Disclaimer: This is information - not financial advice or recommendation.\n";
  msg += `Powered By Nuttakit Kundum - 2023`;
  return msg;
}

module.exports = generateMessage;
