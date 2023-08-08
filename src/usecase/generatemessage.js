const getPosition = require("../data/getposition");
const getTrader = require("../data/gettrader");
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

function unixTimeToLocalThaiDateTime(unixTimestamp) {
  const date = new Date(unixTimestamp); // Convert Unix timestamp to milliseconds

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  };

  return date.toLocaleString("th-TH", options);
}

function timeAgoFromUnixTimestamp(unixTimestamp) {
  const now = Date.now() / 1000; // Convert current time to Unix timestamp in seconds
  const diffInSeconds = Math.floor(now - unixTimestamp/1000);

  if (diffInSeconds >= 3600) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds >= 60) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInSeconds} sec${diffInSeconds !== 1 ? 's' : ''} ago`;
  }
}

module.exports = generateMessage;
