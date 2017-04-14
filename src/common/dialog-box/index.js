/**
 * Created by lee on 2016/4/6.
 */

var popup = require("common/popup");
require("./dialog-box.css");
var config = require("common/config");

function dialogBox(el,opts){
    var $this = this;
    opts = opts||{};

    this.el = $(el);
    this.root = $('<div class="dialog-box"></div>');
    this.header = $('<div class="dialog-header"></div>');
    this.titleBar = $('<div class="dialog-title"></div>');
    this.closeBtn = $('<a class="dialog-close-btn iconfont-close"></a>');
    this.body = $('<div class="dialog-body"></div>');

    if(opts.title){
        this.header.append(this.titleBar);
        this.titleBar.text(opts.title);
    }

    if(opts.closeBtn){
        this.header.append(this.closeBtn);
    }

    if(opts.title || opts.closeBtn){
        this.root.append(this.header);
    }

    this.root.append(this.body);
    this.body.append(this.el);

    this.pop = new popup(this.root);
    this.closeBtn.on(config.CLICK,function(){
        $this.close();
    });

}


dialogBox.prototype.show = function(mode){
    this.pop.show({mode:mode});
    var width = this.el.data("width");
    if(width){
        this.root.width(width);
    }

    var w = this.root.width();
    var h = this.root.height();

    var pw = this.pop.root.width();
    var ph = this.pop.root.height();

    if(w < 20){
        w = pw *0.95;h = ph * 0.8;
        this.root.width(w);
        this.root.height(h);
        this.root.css('line-height',h+'px');
    }

    this.root.css("left",(pw-w)/2);
    this.root.css("top",(ph-h)/2);
};



dialogBox.prototype.close = function(){
    this.pop.close();
};

module.exports = dialogBox;