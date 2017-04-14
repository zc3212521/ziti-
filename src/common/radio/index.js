/**
 * Created by lee on 16-3-5.
 */
var config = require("common/config");
require("./radio.css");
var $ = require("common/zepto");

function radio(selector, checkedIndex) {
    var $this = this;
    this.el = $(selector);
    this.el.addClass("ui-radio");
    this.rs = this.el.children();
    this.rs.addClass("r");
    this.rs.on(config.CLICK, function () {
        if ( $(this).find("input[type=radio]").prop("readOnly") ) return;

        $(this).addClass("on").siblings().removeClass("on");

        // 选中的li中的input置为checked=true，其他的li中的input置为checked=false
        $(this).find("input[type=radio]").attr('checked', true);
        $(this).siblings().find("input[type=radio]").attr('checked', false);
        
        $this.val = $(this).find("input[type=radio]").val();
        $this.cb && $this.cb.call($this, $this.val);
    });

    if (typeof checkedIndex === "undefined") {
        //根据input的checked属性来设置选中状态
        var input = this.rs.find("input[checked]");
        input.parents(".r").addClass("on");
        this.val = input.val();
        this.name = input.attr("name");
    } else {
        $(this.rs[checkedIndex]).trigger(config.CLICK);
    }

}

/**
 * 根据value值设置选中项
 * @param value
 */
radio.prototype.selectByValue = function(value){
    var rs = this.el.find("input[type=radio]");
    for(var i=0;i<rs.length;i++){
        var r = $(rs[i]);
        if(r.val() == value){
            r.attr('checked',true);
            r.parents(".r").addClass("on");
        }else{
            r.attr('checked',false);
            r.parents(".r").removeClass("on");
        }
    }
};

radio.prototype.change = function (cb) {
    this.cb = cb;
};

module.exports = radio;