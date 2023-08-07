const getPosition = require('../data/getposition');
const generateMessage = require('../usecase/generatemessage');
require("dotenv").config();

async function startWorker() {
  const name = process.env.TRADER
  const msg = await generateMessage(name)
  console.log(msg)
}

// Set the interval to 1000 milliseconds (1 second)
const sec = 1000;
const min = sec * 60;
const interval = parseInt(process.env.INTERVAL, 10)
setInterval(startWorker, min * interval);

module.exports = startWorker;
