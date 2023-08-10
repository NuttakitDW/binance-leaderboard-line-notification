const getInfo = require("../data/getinfo");
const getPosition = require("../data/getposition");
const getTrader = require("../data/gettrader");
const unixTimeToLocalThaiDateTime = require("../usecase/thaitime");
const updatePosition = require("../usecase/updateposition");
const closeAllPosition = require("../usecase/closeallposition");
const pushMessage = require("./pushmessage");
require("dotenv").config();

let nonActiveCount = 0;
const DAY = 1440; // Day in min unit

async function startWorker() {
  const now = new Date();
  const timeCheck = unixTimeToLocalThaiDateTime(now);
  const name = process.env.TRADER;

  try {
    const trader = await getTrader(name);
    const positions = await getPosition(trader.encryptedUid);

    console.info(`[${timeCheck}] ${name}: WORKING`);

    if (positions === null && Object.keys(trader.positions).length > 0) {
      console.info(`[${timeCheck}] ${name}: CLOSING ALL REMAINING POSITION`);
      const msgs = await closeAllPosition(trader);
      for (let i = 0; i < msgs.length; i++) {
        console.info(`[${timeCheck}] ${name}: SENDING LINE MESSAGE`);
        pushMessage(msgs[i]);
      }
    } else if (positions === null) {
      console.info(`[${timeCheck}] ${name}: POSITION NOT ACTIVE ${process.env.INTERVAL * nonActiveCount} MIN`);
      nonActiveCount += 1;
      timePass = process.env.INTERVAL * nonActiveCount;

      // check profile only first null position and when trader not active more than 1 day
      if (nonActiveCount === 1 || timePass > DAY) {
        console.info(`[${timeCheck}] ${name}: POSITION NOT ACTIVE`);
        timePass > DAY ? (nonActiveCount = 0) : nonActiveCount;

        const info = await getInfo(trader.encryptedUid);

        if (!info.positionShared) {
          console.error(
            `[${timeCheck}] ${name}: SHARED POSITION HAS CLOSED`
          );
          process.exit(1);
        }
      }
      const now = Date.now();
      const thNow = unixTimeToLocalThaiDateTime(now);
    } else {
      nonActiveCount = 0;
      console.info(`[${timeCheck}] ${name}: UPDATING POSITION(s)`);
      const msgs = await updatePosition(trader, positions);
      for (let i = 0; i < msgs.length; i++) {
        console.info(`[${timeCheck}] ${name}: ORDER HAS CHANGED`);
        console.info(`[${timeCheck}] ${name}: SENDING LINE MESSAGE`);
        console.info(`${msgs[i]}`);
        pushMessage(msgs[i]);
      }
    }
  } catch (error) {
    console.error(`[${timeCheck}] ${name}: ERROR`);
    console.error(error);
  }
}

// Set the interval to 1000 milliseconds (1 second)
const sec = 1000;
const min = sec * 60;
const interval = parseInt(process.env.INTERVAL, 10);
setInterval(startWorker, min * interval);

module.exports = startWorker;
