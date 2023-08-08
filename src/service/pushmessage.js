const axios = require('axios');
require("dotenv").config();

const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
function pushMessage(msg) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${channelAccessToken}`,
  };

  const data = {
    "messages": [
      {
        "type": "text",
        "text": msg
      }
    ]
  };

  const url = 'https://api.line.me/v2/bot/message/broadcast';

  return axios.post(url, data, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

module.exports = pushMessage;
