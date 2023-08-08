const axios = require("axios");
const Info = require("../entity/info");
require("dotenv").config();

/**
 * @param {string} uid
 * @returns {Info}
 */
async function getInfo(uid) {
  const options = {
    method: "GET",
    url: process.env.INFO_URL,
    params: {
      encryptedUid: uid,
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.HOST,
    },
  };

  try {
    const res = await axios.request(options);
    const resData = res.data.data;
    const info = new Info(
        uid,
        resData.nickName,
        resData.positionShared,
        resData.deliveryPositionShared,
        resData.followerCount,
        resData.twitterUrl,
        resData.leaderboardUrl,
    );
    return info
  } catch (error) {
    console.error(error);
  }
}
module.exports = getInfo;
