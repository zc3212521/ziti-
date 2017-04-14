/**
 * Created by lee on 2016/4/8.
 *
 * 头像适配处理代码
 */

var $ = require("common/zepto");

module.exports.init = function(elements){
    //console.log("###############");
    elements.each(function(){
        $(this).on("load",function(){
            var img = $(this);
            //console.log("##",img.attr("src"));
            var parent = img.parent();
            var pborder = parseInt(parent.css("border-width"))*2;
            var w = parent.width()-pborder,h = parent.height()-pborder;
            var iw = img.width(),ih = img.height();

            if(ih<iw){
            	img.css("height",h);
                img.css("width",iw*h/ih);
                //img.css("width","auto");
                //img.css("margin-left",-1*(img.width()-w)/2);
                img.css("margin-left",-1*(iw*h/ih-w)/2);
            }else{
                img.css("width",w);
                img.css("height",ih*w/iw);
                //img.css("height","auto");
                //img.css("margin-top",-1*(img.height()-h)/2);
                img.css("margin-top",-1*(ih*w/iw-h)/2);
            }
        });

    });
};