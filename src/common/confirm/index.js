/**
 * Created by lee on 2016/4/14.
 */

var config = require("common/config");
var DialogBox = require("common/dialog-box");

require("./confirm.css");

/**
 *
 * okText,cancelText,blankCancel,cb
 * @param msg
 * @param opts
 * @constructor
 */

function Confirm(msg,opts){
    var box = $('<div class="confirm-box"></div>');
    var content = $('<div class="confirm-content"></div>');
    var bottom  = $('<div class="confirm-bottom clearfix"></div>')
    var okBtn = $('<a class="confirm-ok">确定</a>');
    var cancelBtn = $('<a class="confirm-cancel">取消</a>');

    opts = opts||{};

    box.append(content);
    box.append(bottom);
    bottom.append(okBtn);
    bottom.append(cancelBtn);
    if(typeof opts.okText === "string"){
        okBtn.text(opts.okText);
    }

    if(typeof opts.cancelText === "string"){
        cancelBtn.text(opts.cancelText);
    }
    content.text(msg);

    var dialog = new DialogBox(box);
    dialog.show(true);
    dialog.root.css("left","10%");
    dialog.root.css("right","10%");

    okBtn.on(config.CLICK,function(){
        dialog.close();
        opts.cb && opts.cb(true);
    });

    cancelBtn.on(config.CLICK,function(){
        dialog.close();
        opts.cb && opts.cb(false);
    });

    if(typeof opts.blankCancel === "boolean"){
        dialog.pop.bg.on(config.CLICK,function(){
           dialog.close();
        });
    }
}


module.exports = Confirm;
