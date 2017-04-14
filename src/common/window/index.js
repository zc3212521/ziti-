/**
 * Created by lee on 2016/7/26.
 *
 *
 * add 'ui-window' to element class
 */

var $ = require("common/zepto");
var URL = require("common/url");

// $("body").delegate(".ui-window", "click", function (e) {
//     newFrame($(this).attr("href"));
//     return false;
// });

$("body").delegate("a",config.CLICK,function(e){
    // e.stopImmediatePropagation();
    if($(this).attr('href').indexOf('http://action:')==-1){
        e.preventDefault();
        var href = $(this).attr('href');
        if(href!=undefined && href!="" && href!="null" && href!=null){
            if($(this).hasClass('ui-window')){
                newFrame($(this).attr("href"));
            }else{
                URL.setWindowLocationHref(href);

            }
            return false;
        }
    }
});

function newFrame(href) {
    // console.log("newFrame");
    var url = URL.getWindowLocationHref();
    var parentURI = url.substring(url.lastIndexOf("/") + 1,url.indexOf(".html")+5);
    var currentURI = href.substring(href.lastIndexOf("/") + 1,href.indexOf(".html")+5);

    var data = {
        parentURI: parentURI,
        currentURI: currentURI,
        history:[]
    };

    var width = $("body").width();

    $("body").append("<div class='hack-click2'></div>");
    var f = $("<iframe id='innerFrameWindow' name='" + JSON.stringify(data) + "' class='ui-window-frame'></iframe>");
    $("body").append(f);
    f.css("width",width+"px");
    //f.css("left",width+"px");

    //$(".page").css("width",width+"px");

    f.attr("src",URL.passParamsByLocal(href));
    // console.log("body.width:",$("body").width());
    f.bind("webkitAnimationEnd.in",function(){
        // console.log("webkitAnimationEnd");
        f.off("webkitAnimationEnd.in");

        f.css("left",0);
        $(".page").css("left",-1*width+'px');

        f.removeClass("ui-window-frame-in");
        $(".page").removeClass("ui-window-frame-in1");

        //HackCode 阻止弹出iframe滑动到底部后再滑动导致父window内容滑动
        //if(window.location.href.substring(window.location.href.lastIndexOf("/") + 1,window.location.href.indexOf(".html")+5) == "square.html"){
        //    $(".page").css("display","none");
        //}
        //HackCode
    });

    var iFrm = document.getElementById('innerFrameWindow');
    iFrm.onload = iFrm.onreadystatechange = function() {
        if (!iFrm.readyState || iFrm.readyState == "complete") {
            $(".ui-window-title-temp .back").unbind("click");
            $(".ui-window-title-temp").remove();
            $(".hack-click2").remove();
        }
    };

    //f.addClass("ui-window-frame-in");
    //$(".page").addClass("ui-window-frame-in1");

    var t = $('<header class="ui-window-title-temp"><a class="back" data-color="#fff"><canvas class="ui-window-title-back"></canvas></a></header>');
    $("body").append(t);
    $(".ui-window-title-temp .back").bind("click", function(){
        window.parent.windowBack();
        $(this).unbind("click");
        $(".ui-window-title-temp").remove();
        $(".hack-click2").remove();
        return false;
    });
    t.css("width",width+"px");
}




function backHandler(){

    console.log("##########back start");
    if(window.location.href.indexOf("chatroom.html")>-1){
        //埋点：直播间详情返回
        $.TalkingData("0107000202");
        $.chatroomTalking("0");
    }
    var $this = $(this);
    var backHref = $this.attr("href")||"";
    backHref = backHref.substring(backHref.lastIndexOf("/") + 1,backHref.indexOf(".html")+5);
    // console.log("backHref:"+backHref);
    if (backHref) {
        // console.log("has backHref");
        //如果返回按钮存在具体的URI，那么只有与parentURI相等的时候才会关闭Iframe
        if(backHref == window.data.parentURI){
            console.log("close remove iframe");
            window.parent.stopClick();
            window.parent.windowBack();
            return false;
        }
        console.log("has backHref but no remove iframe");
    } else {
        // console.log("hasn't backHref");
        var curHref = URL.getWindowLocationHref();
        curHref = curHref.substring(curHref.lastIndexOf("/") + 1,curHref.indexOf(".html")+5);
        // console.log("hasn't backHref curHref:"+curHref);
        window.parent.stopClick();

        //alert('window.data.history.length='+window.data.history.length);
        //alert('window.data.history='+window.data.history.toString());

        //如果iframe.window.name里面的history长度为<=1的时候
        if(window.data.history.length<=1){//alert('关闭iframe4');
            console.log("no history remove iframe");
            window.parent.windowBack();
            return false;
        }

        var his = window.data.history;
        var a = his.pop(); //alert('pop第一个url'+a);
        var url = his.pop();
        //alert('url跳转_pop第二个'+url);
        window.name = JSON.stringify(window.data);

        // console.log("##########back end to:",url);
        URL.setWindowLocationHref(url);
        return false;
    }
}

var name = window.name;
window.data = {currentURI: "", parentURI: "",history:[]};
if (name) {
    // console.log("window.data:"+name);
    window.data = JSON.parse(name);
}
var len = window.data.history.length;
var url = URL.getWindowLocationHref();
if(url!=null && (len<=0 || window.data.history[len-1] != url) ){
    // if(window.sessionStorage._navUrl!=undefined && window.sessionStorage._navUrl!=null){
    //     var a = window.sessionStorage._navUrl.split('?');
    //     if(a.length>1){
    //         var urlObj = URL.getParamFromUrl(url);
    //         var paramObj = URL.getParamFromUrl(window.sessionStorage._navUrl);
    //         for(var key in paramObj){
    //             if(paramObj.hasOwnProperty(key)){
    //                 urlObj.params[key] = paramObj[key];
    //             }
    //         }
    //         url = URL.addParamToUrl(URL.getWindowLocationHref(),urlObj);
    //     }
    // }
    var doPush = true;
    //alert('window.sessionStorage.isReload='+window.sessionStorage.isReload);
    //alert('window.sessionStorage.isReload!=undefined='+(window.sessionStorage.isReload!=undefined));
    //alert('window.sessionStorage.isReload==1='+(window.sessionStorage.isReload=='1'));
    if( window.sessionStorage.isReload!=undefined &&  window.sessionStorage.isReload=='1'){
        //alert('isReload==true5');
        window.sessionStorage.isReload = '0';
        doPush = false;
        // if(window.data && window.data.history){
        //     window.data.history=[];
        //     alert('window.data.history=[]');
        // }
    }
    if(doPush){
        //alert('要push url：'+url);
        //alert('push前 window.data.history='+window.data.history.toString());
        window.data.history.push(url);
        //alert('push后 window.data.history='+window.data.history.toString());
    }
}
window.name = JSON.stringify(window.data);

window.windowBack = function(){
    // console.log("window.parent.windowBack();");

    $(".page").bind("webkitAnimationEnd.out",function(){
        $(this).off("webkitAnimationEnd.out");

        $(this).css("left",0);
        $(this).removeClass("ui-window-frame-out1");
        $("#innerFrameWindow").remove();
    });
    //$("#innerFrameWindow").addClass("ui-window-frame-out");
    //$(".page").addClass("ui-window-frame-out1");

    if (window.childrenWindowBackCallback) {
        window.childrenWindowBackCallback(window.childrenWindowBackCallbackParam);
        delete window.childrenWindowBackCallback;
        delete window.childrenWindowBackCallbackParam;
    }
    $("#innerFrameWindow").remove();

};

$(function () {
    if(URL.getWindowLocationHref().indexOf("rtnNative=1") != -1){
        $(".back").attr("href","http://action:3413");
    }else{
        $(".back").on("click", backHandler);
    }

    document.addEventListener('touchstart', touchSatrtFunc, false);
    document.addEventListener('touchmove', touchMoveFunc, false);
    document.addEventListener('touchend', touchEndFunc, false);

    var startX = -1;
    var startY = -1;
    var moveX =-1;
    var moveY = -1;
    function touchSatrtFunc(evt) {
        // console.log("back touchstart");
        var t=evt.touches?evt.touches[0]:evt;
        moveX = startX = Number(t.pageX); //页面触点X坐标
        moveY = startY = Number(t.pageY); //页面触点X坐标
    }

    function touchMoveFunc(evt) {
        // console.log("back touchmove");
        var t=evt.touches?evt.touches[0]:evt;
        moveX = Number(t.pageX); //页面触点X坐标
        moveY = Number(t.pageY); //页面触点X坐标
    }

    function touchEndFunc(evt) {
        // console.log("back touchend");
        if($("#innerFrameWindow").length<=0){
            var val = Math.abs(moveY-startY)/Math.abs(moveX-startX);
            // console.log("val:",val);
            //tan20
            if(val>=0.364)return;

            //判断滑动方向
            if (moveX - startX > 150) {
                console.log("back trigger click");
                $(".back").trigger(config.CLICK);
            }
        }

        startX = -1;
        startY = -1;
        moveX = -1;
        moveY = -1;
    }

});


module.exports.open = newFrame;