/**
 * @param {number} unixTimestamp
 * @returns {string}
 */
function timeAgoFromUnixTimestamp(unixTimestamp) {
  const now = Date.now(); // Convert current time to Unix timestamp in seconds
  const diffInSeconds = Math.floor((now - unixTimestamp) / 1000);

  if (diffInSeconds >= 3600) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds >= 60) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""} ago`;
  }
}

module.exports = timeAgoFromUnixTimestamp;
