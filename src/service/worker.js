const getPosition = require('../data/getposition');
const generateMessage = require('../usecase/generatemessage');
const sendMessage = require('./notification')
require("dotenv").config();

async function startWorker() {
  const name = process.env.TRADER
  const msg = await generateMessage(name)
  sendMessage(msg)
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Set the interval to 1000 milliseconds (1 second)
const sec = 1000;
const min = sec * 60;
const interval = parseInt(process.env.INTERVAL, 10)
setInterval(startWorker, min * interval);

module.exports = startWorker;
