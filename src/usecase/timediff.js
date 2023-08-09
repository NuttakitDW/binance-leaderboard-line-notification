/**
 * @param {number} unixTimestamp
 * @returns {number}
 */
function timeDiffFromUnixTimestamp(unixTimestamp) {
    const now = Date.now() / 1000; // Convert current time to Unix timestamp in seconds
    const diffInSeconds = Math.floor(now - unixTimestamp/1000);
  
    return diffInSeconds
}

  module.exports = timeDiffFromUnixTimestamp;