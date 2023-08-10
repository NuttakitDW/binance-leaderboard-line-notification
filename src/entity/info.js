/**
 * Represents a trader info.
 * @class
 */
class Info {
  /**
   * Create a new Position instance.
   * @param {string} encryptedUid 
   * @param {string} nickName 
   * @param {boolean} positionShared 
   * @param {boolean} deliveryPositionShared 
   * @param {number} followerCount 
   * @param {string} twitterUrl 
   * @param {string} leaderboardUrl 
   */
  constructor(
    encryptedUid,
    nickName,
    positionShared,
    deliveryPositionShared,
    followerCount,
    twitterUrl,
    leaderboardUrl
  ) {
    this.encryptedUid = encryptedUid;
    this.nickName = nickName;
    this.positionShared = positionShared;
    this.deliveryPositionShared = deliveryPositionShared;
    this.followerCount = followerCount;
    this.twitterUrl = twitterUrl;
    this.leaderboardUrl = leaderboardUrl;
  }
}

module.exports = Info;
