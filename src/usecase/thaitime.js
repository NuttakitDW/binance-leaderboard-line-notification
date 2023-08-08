/**
 * @param {number} unixTimestamp
 * @returns {string}
 */
function unixTimeToLocalThaiDateTime(unixTimestamp) {
    const date = new Date(unixTimestamp); // Convert Unix timestamp to milliseconds
  
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Bangkok",
    };
  
    return date.toLocaleString("th-TH", options);
  }

  module.exports = unixTimeToLocalThaiDateTime;