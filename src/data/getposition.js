const axios = require("axios");
const Position = require("../entity/position");
const Status = require("../constant/enum");
require("dotenv").config();

/**
 * @param {string} uid
 * @returns {Position[]}
 */
async function getPosition(uid) {
  console.log("getPosition")
  const options = {
    method: "GET",
    url: process.env.POSITION_URL,
    params: {
      encryptedUid: uid,
      tradeType: "PERPETUAL",
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.HOST,
    },
  };

  try {
    const res = await axios.request(options);
    const resData = res.data.data[0];
    const resPositions = resData.positions.perpetual;

    if (resPositions === null) {
      return null;
    }

    let positions = [];

    for (let i = 0; i < resPositions.length; i++) {
      const pos = resPositions[i]

      const symbol = pos.symbol;
      const status = Status.OPEN;
      const entryPrice = pos.entryPrice;
      const markPrice = pos.markPrice;
      const pnl = pos.pnl;
      const roe = pos.roe;
      const amount = pos.amount;
      const tradeBefore = pos.tradeBefore;
      const long = pos.long;
      const short = pos.short;
      const leverage = pos.leverage;

      const tradeStartUnix = pos.updateTimeStamp;
      const updatedTime = Date.now();

      const position = new Position(
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
        tradeStartUnix,
        updatedTime,
      );

      positions.push(position)
    }
    return positions
  } catch (error) {
    console.error(error);
  }
}

module.exports = getPosition;
