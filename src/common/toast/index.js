

var config = require("common/config");
var $ = require("common/zepto");

require("./style.css");

/**
 * 显示一条text消息，过段时间会自动消失
 * @param  {String} text     [description]
 * @param  {String} duration "long", "short"(默认)
 * @return {[type]}          [description]
 */
function show(text, duration) {
  if (!duration) {
    duration = "short";
  }

  var id = "toast" + parseInt(Math.random() * 100000);
  var toastEle = $("<div id='" + id + "' class='toast'><p class='toast-content'>" + text + "</p></div>");

  $("body").append(toastEle);
  var toastCon = toastEle.find(".toast-content");
  toastCon.css("margin-bottom",-1*toastCon.height()/2);
  toastCon.css("margin-left",(toastCon.parent().width()-30-toastCon.width())/2);


  var durationTime = 2000;
  if (duration === "long") {
    durationTime = 3500;
  }

  setTimeout(function(){
    var toast = $("#" + id);
    if (toast) {
      toast.remove();
    }
   
  }, durationTime);
}

module.exports.show = show;
