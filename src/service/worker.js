const getInfo = require("../data/getinfo");
const getPosition = require("../data/getposition");
const getTrader = require("../data/gettrader");
const unixTimeToLocalThaiDateTime = require("../usecase/thaitime");
const updatePosition = require("../usecase/updateposition");
const closeAllPosition = require("../usecase/closeallposition");
const pushMessage = require("./pushmessage");
require("dotenv").config();

async function startWorker() {
  try {
    const name = process.env.TRADER;
    const trader = await getTrader(name);
    const positions = await getPosition(trader.encryptedUid);
    const info = await getInfo(trader.encryptedUid);

    if (!info.positionShared) {
      const msg = `${name} no longer share position.`;
      console.log(msg);
      return;
    }

    if (positions === null && Object.keys(trader.positions).length > 0) {
      const msgs = await closeAllPosition(trader);
      for (let i = 0; i < msgs.length; i++) {
        pushMessage(msgs[i]);
      }
    } else if (positions === null) {
      const now = Date.now();
      const thNow = unixTimeToLocalThaiDateTime(now);
      console.log(`${name} doesn't have any position yet.`);
      console.log(thNow);
    } else {
      const msgs = await updatePosition(trader, positions);
      for (let i = 0; i < msgs.length; i++) {
        pushMessage(msgs[i]);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Set the interval to 1000 milliseconds (1 second)
const sec = 1000;
const min = sec * 60;
const interval = parseInt(process.env.INTERVAL, 10);
setInterval(startWorker, sec * 10);

module.exports = startWorker;
