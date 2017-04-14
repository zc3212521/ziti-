/**
 * Created by lee on 2016/4/8.
 *
 * 微店列表公共代码
 */

require("./pub.css");
var config = require("common/config");

    // 加赞
$("body").undelegate(".zanButton", config.CLICK);
var flagCanDoZan = true;
$("body").delegate(".zanButton", config.CLICK, function(e){
    var $this = $(this);
    if(flagCanDoZan){
        flagCanDoZan = false;
        if ($this.hasClass("loading") ) return;
        var opt = "zan";
        if($this.hasClass("zan")){
            opt = "qxzan";
        }
        $this.addClass("loading");
        $.ajaxp({
            url : config.zosSvrC + "/zos/view/approve?callback=?&opt="+opt+"&vpId=" + $this.data("vid")
            ,data : {}
            ,type : "GET"
            ,dataType : "text/json"
            ,success : function(resp) {
                $this.removeClass("loading");
                if (resp.code === "0000") {
                    $("a[data-vid='" + $this.data("vid") + "']").each(function() {
                        var num = $(this).text();
                        if(opt=="zan"){
                            $(this).removeClass("meizan").addClass("zan");
                            $(this).text(parseInt(num) + 1);
                        }else{
                            $(this).text(parseInt(num) - 1);
                            $(this).removeClass("zan").addClass("meizan");
                        }
                    });
                } else {
                    alert(resp.msg);
                }
            }
            ,error:function(err) {
                $this.removeClass("loading");
                console.error(err);
            }
        });
    }

    setTimeout(function(){
        flagCanDoZan = true;
    },300);

});
//$("body").delegate(".playsounds", config.CLICK, function(){
//	//在此添加播放事件
//    var $this = $(this);
//
//    return false;
//});

/**
 * 获取是否已赞请求
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function renderApproveList(data) {
    console.info("renderApproveList");
    var vpIds = "";
    $.each(data.list, function(n, value) { 
        vpIds = vpIds + value.VP_ID + ",";
    });
    if (vpIds == "") return;
    vpIds = vpIds.substring(0, vpIds.length - 1);
    // 查询赞的列表
    $.ajaxp({
        url : config.zosSvrC + "/zos/view/getApproveList?callback=?&vpIds=" + vpIds,
        data : {}
        ,type : "GET"
        ,dataType : "text/json"
        ,success : function(resp) {
            if (resp.code === "0000") {
                $.each(resp.data, function(n, value) {
                    if (value.IS_ZAN == "1") {
                        $("a[data-vid='" + value.VP_ID + "']").each(function() {
                            $(this).removeClass("meizan").addClass("zan");
                        }); 
                    }
                });
             } else {
                 alert(resp.msg);
             }
        }
    });
}

/**
 * 注意此图片尺寸调整宽高比非1:1
 * @param elements
 */
function resizePic(elements){
    //console.log("###############resizePic");
    elements.each(function(){
        $(this).on("load",function(){
            var img = $(this);
            //console.log("##",img.attr("src"));
            var parent = img.parent();
            var pborder = parseInt(parent.css("border-width"))*2;
            console.log("parent.pborder:",pborder);
            var w = parent.width()-pborder,h = parent.height()-pborder;
            var whr = w/h;

            var iw = img.width(),ih = img.height();

            //如果宽度比例上小于高度
            if(iw/ih<whr){
                img.css("width",w);
                var newH = ih*w/iw;
                img.css("height",newH);
                img.css("margin-top",-1*(newH-h)/2);
            }else{
                img.css("height",h);
                var newW = iw*h/ih;
                img.css("width",newW);
                img.css("margin-left",-1*(newW-w)/2);
            }
        });

    });
}


module.exports.template = require("./pub.tpl");
module.exports.renderApproveList = renderApproveList;
module.exports.resizePic = resizePic;