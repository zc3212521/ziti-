/**
 * [exports description]
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
module.exports = function(content) {
  if (content) {
    return content.replace(/\n/g,'<br/>');
  }
  return "";
};