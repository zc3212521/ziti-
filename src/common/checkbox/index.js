/**
 * Created by lee on 16-3-5.
 */

var config = require("common/config");
require("./checkbox.css");
var $ = require("common/zepto");


function checkbox(selector,checkeds){
    this.el =  $(selector);
    this.el.addClass("ui-checkbox");
    var rs = this.el.children();
    rs.addClass("c");
    rs.on(config.CLICK,function(){
        var $this = $(this);
        if ( $this.find("input[type=checkbox]").prop("readOnly") ) return;

        if ( $this.hasClass("on") ) {
            $this.removeClass("on");
            $this.find("input[type=checkbox]").attr('checked', false);
        } else {
            $this.addClass("on");
            $this.find("input[type=checkbox]").attr('checked', true);
        }

    });

    //根据input的checked属性来设置选中状态
    rs.find("input[checked]").parents(".c").addClass("on");

}

checkbox.prototype.selectAll = function(isAll){
    var checkboxes = this.el.find("input[type=checkbox]");
    checkboxes.attr('checked',isAll);
    if(isAll) {
        checkboxes.parents(".c").addClass("on");
    }else{
        checkboxes.parents(".c").removeClass("on");
    }
};

checkbox.prototype.val = function(){
    var values = [];
    this.el.find("input[type=checkbox]:checked").each(function(){
        values.push($(this).val());
    });

    return values;
};

/**
 * 根据checkbox的value值来设置选中
 * @param values string|string[]
 */
checkbox.prototype.selectByValue = function(values){
    var valueStr = ","+values.toString()+",";
    var rs = this.el.find("input[type=checkbox]");
    for(var i=0;i<rs.length;i++){
        var r = $(rs[i]);
        var v = r.val();
        if(valueStr.indexOf(","+v+",") != -1){
            r.attr('checked',true);
            r.parents(".c").addClass("on");
        }
    }
};


module.exports = checkbox;