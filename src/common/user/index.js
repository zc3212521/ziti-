/**
 * Created by lee on 16-4-1.
 *
 * 用户权限设置，根据
 *
 * 增加插件参数
 *  pluginType:WX|WX_DINGYUE
 *  pluginUserId:xxxxxx
 *
 */

var $ = require("common/zepto");
var Sun = require("common/sun");
var config = require("common/config");
var URL = require("common/url")

var currentTarget = null;

var params = URL.getParamFromUrl(window.top.location.href).params;
var testInfo = null;

function init() {
    var user = getUser();
    // console.log("#############################");
    if (user) {
        allowAccess();
    } else {
        stopAccess();
    }

}

function autoFollow(userId){
    // console.log("###test autoFollow:",userId);
    if(window.localStorage.autoFollow)return;
    // console.log("start autoFollow now");
    $.ajaxp({
        url: config.zosSvrC + "/zos/shop/autoFollowShop?callback=?",
        data: {userId:userId}
        , type: "GET"
        , dataType: "text/json"
        , success: function (resp) {
            if (resp.code === "0000") {
                console.log("autoFollow success:",resp);
                window.localStorage.autoFollow = true;
            } else {
                console.log(resp.code + ":" + resp.msg);
            }
        }
        , error:function(err){
            console.log(err);
        }
    });
}

function stopAccess() {
    $("body").delegate(".zt-user",config.CLICK,stopClick);
}

function stopClick(e){
    if(!getUser()){

        currentTarget = $(e.target);
        e.stopImmediatePropagation();
        showLogin();
        return false;
    }else{
        // console.log("has ui-window?");
        if($(this).hasClass("ui-window"))return;
        var href = $(this).attr("href");
        if(href){
            URL.setWindowLocationHref(href);
        }
    }
}

function allowAccess() {
    $("body").undelegate(".zt-user",config.CLICK,stopClick);
    //open visit <a>
    var aList = $(".zt-user");
    for (var i = 0; i < aList.length; i++) {
        var $a = $(aList[i]);
        var href = $a.data("href");
        if(href){
            $a.attr("href",href);
        }
    }
}


/**
 * 获取当前用户信息
 * 如果没有登录，返回null
 * 返回用户数据结构
 * {userId:"张三", phone:"13400000000"}
 * @returns {*}
 */
function getUser() {

    //window.infoStr = "2&&guojing";
    //2&&6600922&&MTg2MTU2MjU4NzY2NjAwOTIyMTAzNDc2ODYwOQ==&&18615625876
    var info = null;
    try {
        if(config.user)return config.user;

        if(window.top != window){
            window.top.nextWindow = window;
        }
        var infoStr = window.top.Sun.callNative('getLoginInfo', '');

        //infoStr = window.infoStr;
        infoStr = testInfo || infoStr || "";
        var startIndex = window.top.location.href.indexOf("testuser=");
        if(startIndex>0){
            var endIndex = window.top.location.href.indexOf("@@");
            infoStr = "2&&"+window.top.location.href.substring(startIndex+9,endIndex);
        }


        if(params.pluginType == "WX" && params.pluginUserId){
            infoStr = "2&&"+params.pluginUserId;
            // console.log("WX:",infoStr);
        }

        // console.log("getLoginInfo:",infoStr);
        if (infoStr) {
            var infoArr = infoStr.split("&&");
            //已经登录
            if (infoArr[0] == "2") {
                info = {userId: infoArr[1],phone:""};
                if(infoArr.length>=4){
                    info.phone = infoArr[3]
                }
                config.user = info;
                window.localStorage.userId = info.userId;//缓存起来
                $(document).trigger("loginUser",config.user);
                allowAccess();
                autoFollow(info.userId);
            }
        }
    } catch (e) {
        console.log(e);
    }

    return info;
}

/**
 * 弹出登录框
 */
function showLogin() {
    // console.log("showLogin...");
    if(params.pluginType === "WX_DINGYUE"){
        require("common/toast").show("微信订阅号不支持资金账号登录，请到中泰齐富通APP参与互动哦");
        return;
    }

    //setTimeout(doNext,2000);
    //return;
    window.top.location.href = 'http://action:10090/?logintype=1&&loginkind=2&&jsfuncname=doNext()';
}

/**
 * 对壳公开登录后的下一步接口
 */
window.doNext = function(){
    //testInfo = "2&&lishg";

    if(window.nextWindow){
        console.log("window.nextWindow.doNext");
        window.nextWindow.doNext();
        window.nextWindow = null;
        return;
    }
    console.log("window.doNext");
    if(currentTarget){
        console.log(currentTarget,"trigger click");
        currentTarget.trigger(config.CLICK);
        currentTarget = null;
    }
};

/**
 * 对壳公开登录后的下一步接口
 */
window.shareCallBack = function(e){
	if(window.shareWindow){
        window.shareWindow.shareCallBack(e);
        window.shareWindow = null;
        return;
    }
    var result= JSON.parse(e);
    if(result.status==="1")
    {
        $.ajaxp({
            url: config.zosSvrC + "/zos/common/shareLog?callback=?&shareType="+result.shareTo+"&category="+result.shareWDType+"&userId="+result.account+"&shareUrl="+encodeURIComponent(result.shareUrl)
            , type: "get"
            , dataType: "json"
            , success:  function(resp){
                if(resp.code=="0000"){
                	$(document).trigger("shareBackEvent");
                }
            }
            , error: function (err) {
                console.log(err);
            }

        });

    }

};

module.exports.init = init;

module.exports.getUser = getUser;

module.exports.showLogin = showLogin;