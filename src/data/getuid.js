const axios = require("axios");
const Position = require("../entity/position")
require("dotenv").config();

/**
 * @param {string} name
 * @returns {string}
 */
async function getUid(name) {
  console.log("getUid")
    const options = {
        method: 'GET',
        url: process.env.UID_URL,
        params: {
          nickname: name
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': process.env.HOST
        }
      };
      
      try {
          const res = await axios.request(options);
          const uid = res.data.data[0].encryptedUid
          return uid
      } catch (error) {
          console.error(error);
      }
}

module.exports = getUid;
