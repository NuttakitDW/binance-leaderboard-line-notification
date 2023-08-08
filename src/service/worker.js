const getPosition = require("../data/getposition");
const getTrader = require("../data/gettrader");
const generateMessage = require("../usecase/generatemessage");
const unixTimeToLocalThaiDateTime = require("../usecase/thaitime");
const pushMessage = require("./pushmessage");
require("dotenv").config();

async function startWorker() {
  const name = process.env.TRADER;

  const trader = await getTrader(name);
  const positions = await getPosition(trader.encryptedUid);

  console.log(positions);
  if (positions === null) {
    const now = Date.now()
    const thNow = unixTimeToLocalThaiDateTime(now)
    console.log("trader doesn't have any position yet.");
    console.log(thNow);
  } else {
    const msg = await generateMessage(trader, positions);
    pushMessage(msg)
      .then((response) => {
        console.log("Response:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

// Set the interval to 1000 milliseconds (1 second)
const sec = 1000;
const min = sec * 60;
const interval = parseInt(process.env.INTERVAL, 10);
setInterval(startWorker, min * interval);

module.exports = startWorker;
