/**
 * 判断一个店铺是否是官方店铺
 */

var officialShops = require("common/config").officialShops;

module.exports = function(shopId) {
  if (!shopId) {
    return false;
  }
  for (var i = 0 ; i < officialShops.length; i++) {
    if (officialShops[i] == shopId) {
      return true;
    }
  }
  return false;
};