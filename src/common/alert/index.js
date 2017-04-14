/**
 * Created by lee on 2016/4/14.
 */

var config = require("common/config");
var DialogBox = require("common/dialog-box");

require("./alert.css");

function Alert(msg,okText,cb){
    var box = $('<div class="alert-box"></div>');
    var content = $('<div class="alert-content"></div>');
    var bottom  = $('<div class="alert-bottom"></div>')
    var okBtn = $('<a class="alert-ok">确定</a>');

    box.append(content);
    box.append(bottom);
    bottom.append(okBtn);
    if(typeof okText === "string"){
        okBtn.text(okText);
    }
    content.text(msg);

    var dialog = new DialogBox(box);
    dialog.show(true);

    okBtn.on(config.CLICK,function(){
        dialog.close();
        cb && cb();
    });

}


module.exports = Alert;
