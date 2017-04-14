/**
 * 解析发布评论的人的名字，把张三回复李四这样的文字，中的人名解析出来
 * @param  {[type]} name 解析前的人名字符串
 * @return {[type]}      解析后的html字符串
 */
module.exports = function(name) {
  var span;
  var arg = name.split("回复");
  if (arg.length > 1) {
    span = "<span class='bf'>" + arg[0] + "</span> <span class='reply'>回复</span> <span class='af'>" + arg[1] + "</span>";
  } else {
    span = arg[0];
  }
  return span;
};