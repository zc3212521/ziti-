/**
 * Created by lee on 2016/4/8.
 *
 * 微店列表公共代码
 */

require("./wd.css");
var config = require("common/config");
var Share=require("common/share");
var dialog = require("common/dialog");
var URL = require("common/url");


function initFollowEvent(){
    var bInShell =Share.isInQiFuTong();//是否在壳内
    if(bInShell)
    {
        //加关注
        $("body").delegate(".focus-btn", config.CLICK, function(){
            var $this = $(this);
            if ($this.hasClass("icon-loading")) return;
            $this.addClass("icon-loading");

            $.ajaxp({
                url : config.zosSvrC + "/zos/shop/followShop?callback=?"
                ,data : {
                    sid : $this.data("sid"),
                    isfollow : 1
                }
                ,type : "GET"
                ,dataType : "text/json"
                ,success : function(resp) {
                    $this.removeClass("icon-loading");
                    if (resp.code === "0000") {
                        $("a[data-sid='" + $this.data("sid") + "']").each(function(){
                            $(this).removeClass("focus-btn icon-add").addClass("focused icon-correct").find("span").text("已关注");
                            //粉丝数+1
                            var num =  $(this).parent(".wd-info").next().find(".fs-icon>span");
                            var followNum = Number(num.data("follow"));
                            followNum++;
                            num.data("follow", followNum.toString());
                            var temp = "";
                            if (followNum >= 10000000) {
                                temp = followNum.div(10000).toFixed(1) + "+万";
                            } else {
                                temp = followNum.toString();
                            }
                            num.text(temp);
                        });
                    }else if(resp.code === "0020"){
                        $("a[data-sid='" + $this.data("sid") + "']").each(function(){
                            $(this).removeClass("focus-btn icon-add").addClass("focused icon-correct").find("span").text("已关注");
                        });
                        alert("您已经关注该投顾");
                    } else {
                        alert(resp.code + ":" + resp.msg);
                    }
                }
                ,error : function(err) {
                    $this.removeClass("icon-loading");
                    console.error(err);
                }
            });
        });

    }
    else {

        $("body").delegate(".focus-btn",config.CLICK, function () {

            var thisPageUrlInApp = URL.getWindowLocationHref();
            var dialog_err =  new dialog()
                .confirm2("<span class='err-info'>请下载中泰齐富通APP继续操作，若您已下载，可直接打开APP</span>",
                "打开", function(){

                    openclient(thisPageUrlInApp);

                }, "立即下载", function(){
                    //下载齐富通
                    Share.downLoadApp();
                });
            //Share.showDownLoadAppDialog(thisPageUrlInApp);

        });
    }
}

//自动打开齐富通app中店铺详情界面
function openclient() {
    var thisPageUrlInApp = URL.getWindowLocationHref();
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i))
    {
        var tempUrl="com.tzt.zhongtai://url="+encodeURIComponent("http://action:10061/?type=9&&webtype=NoShowClientNav&&url="+encodeURIComponent(thisPageUrlInApp));//打开某手机上的某个app应用
        window.top.location=tempUrl;
    }
    else
    {
        var ifr = document.createElement('iframe');

        //尝试去启动齐富通
        var tempUrl="com.tzt.zhongtai://url="+encodeURIComponent("http://action:10061/?type=9&&webtype=NoShowClientNav&&url="+encodeURIComponent(thisPageUrlInApp));//打开某手机上的某个app应用
        ifr.src=tempUrl;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    }

};
/**
 * 初始化标签数据
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */
function initPersonalLabels(list) {
    var element = "";
    for (var i = 0 ; i < list.length ; i++ ) {
        element = list[i];
        var labels = element.PERSONALLABELS;
        var labels = isEmpty(labels);
        if (labels.length > 0) {
            element.PERSONALLABELS = labels.split(",");
        } else {
            labels = [];
        }
    }
}

function isEmpty(s){
    if (s == null || typeof s == "undefined" || s == "undefined" || s.toLowerCase() == "null" ) {
        s = "";
    }
    return s;
}

initFollowEvent();
module.exports.template = require("./wd.tpl");
module.exports.initPersonalLabels = initPersonalLabels;
module.exports.initFollowEvent = initFollowEvent;