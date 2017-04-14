/**
 * Created by lee on 16-2-23.
 *
 * tab compoment
 *
 */

var config = require("common/config");
require("./tab.css");
var $ = require("common/zepto");

function tab(selector,index,z){
    var $this = this;
    this.el =  $(selector);
    index = (typeof index != "undefined")?index:0;
    var menus = this.el.find(".menu");
    var panels = this.panels = [];

    for(var i=0;i<menus.length;i++){
        var tempMenu = $(menus[i]);
        var m = tempMenu.data("tab-panel");
        panels.push($(m));
        tempMenu.data("index",i);
        tempMenu.removeClass("on");
    }

    menus.on(config.CLICK,menuHandler);

    function menuHandler(){
        if($(this).data("readonly"))return;

        if(!$(this).hasClass("on")){
            $this.el.find(".menu.on").removeClass("on");
            $(this).addClass("on");

            for(var pi in panels){
                if(z){
                    panels[pi].css("z-index","-1");
                }else{
                    panels[pi].css("display","none");
                }

            }

            var panel = $($(this).data("tab-panel"));

            if(z){
                panel.css("z-index","0");
            }else{
                panel.css("display","block");
            }

            $this.cb && $this.cb($(this).data("index"));
        }
    };

    setTimeout(function(){
        menuHandler.apply(menus[index]);
    },0);

}

tab.prototype.change = function(cb){
    this.cb = cb;
};

module.exports = tab;