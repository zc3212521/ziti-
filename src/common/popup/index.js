var $ = require("common/zepto");

require("./popup.css");


function popup(element) {
    if (typeof element === "undefined")return;
    this.element = $(element);
    this.root = $('<div class="popup"></div>');
    this.bg = $('<div class="popup-bg"></div>');
    this.root.append(this.bg);
}

popup.prototype.show = function (opts) {
    this.opts = opts||{mode:true};

    var body = $("body");
    body.append(this.root);
    this.root.append(this.element);
    this.bg.addClass(this.opts.mode?"mode":"");
};

popup.prototype.close = function () {
    this.root.remove();
};

popup.prototype.hide = function () {
    this.root.css("display","none");
};

module.exports = popup;

