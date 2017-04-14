/**
 * Created by lee on 2016/4/8.
 *
 * 微店列表公共代码
 */

require("./vc.css");
var dialog = require("common/dialog");
var config = require("common/config");
var comments = require("common/viewcomments");
var Share = require("common/share");
var URL = require("common/url");


var bInShell = Share.isInQiFuTong();//是否在壳内
var bShare = Share.isShare();//是否打开的分享地址
var gayToolManager =require("./gaytoolManager");
var gaytool =null;
function hideCommentTimeOut(){
    var timeOutO = null;
}

function initCommentFoot(vpid){

    if (!bInShell) {
        //点评获取焦点
        $(".commentFoot").delegate(".l .text", "click", function(){
            openCommentOutApp();
            return false;
        });
    } else {
        //点评获取焦点
        $("body").delegate(".commentFoot .l .text", "click", function(){
            if( gaytool && gaytool.isGay(new Date().getTime())){
                var dialog_relogin_2 = new dialog().know('您的操作过于频繁，请十分钟后再试', '知道了', function () {
                });
                return false;
            }
            openComment();
        });
    }

    // 回退按钮事件
    $(".page > header .backComment").on("click", function(){
            hideCom();
        }
    );

    recalcCommentFootWidth();

//点击回复事件
/*    $("body").delegate(".actionbtn", config.CLICK, function(){
        //客户端，回复评论操作
        var $this = $(this);
        //初始化评论框等
        var pName =  $this.parent().parent().find(".name").text();
        var parentId =  $this.data("id");
        var sendElement = $(".commentFoot .r .send");
        sendElement.data("flag","1");
        sendElement.data("parentId",parentId);
        sendElement.data("pName",pName);

        var pText =  $(".commentFoot .text");

        var oldText = $this.data("oldText");
        if(oldText){
            pText.val(oldText);
        }else{
            pText.val("");
            pText.attr("placeholder","回复"+pName+":");
        }



        //显示评论框
        openComment();
    //end

    });*/


    // 评论观点发送或者回复发送
    $(".page > header .send").on("click", function(){
    /*    var checkelement =   $(".commentFoot .protocol .checkbox");
        var isCheck = checkelement[0].checked;
        if(!isCheck){
            var dialog_relogin_2 = new dialog().know('请阅读并选择同意协议！', '知道了', function () {
            });
            return false;
        }*/
        var $this = $(this);
        var content =$(".commentFoot .open .text").val();
        content = $.trim(content);
        if (content == "") {
            var dialog_relogin_2 = new dialog().know('发送内容不能为空！', '知道了', function() {});
            return false;
        }

        if ($this.hasClass("loading")) return false;
        $this.addClass("loading");

        var flag = $this.data("flag");
        //观点id
        var itemId = $('#viewId').val();
        //评论内容
     /*   var content = $(".commentFoot .open .text").val();*/
        //用户id
        var custId = "";
        if( window.config.user || window.localStorage.userId) {
            custId = window.localStorage.userId;

        }
        var dataS = "&itemId=" + itemId + "&content=" + encodeURIComponent(content) + "&custId=" + custId;
        var custName = "";
        //登录帐号是资金帐号
        var loginName = custId + "";
        if (!loginName) {
            loginName = "游客";
        }
        var nameLen = loginName.length;
        if (nameLen > 4) {
            var cha = "****"
         /*   for(var i=0;i<nameLen-4;i++){
                cha = cha+"*";
            }*/

            loginName = loginName.substring(0,4);
            loginName =loginName+cha ;
        }


        //判断是否是作者
        var parentId = "";
        if (flag === "1") {
            //组织回复数据
            custName =  $this.data("pName");
            if (custName) {
                custName = loginName + "回复" + custName;
            } else {
                custName = loginName;
            }

            parentId = $this.data("parentId");
            var clickElement = $("#" + parentId);
            var parentliid = clickElement.data("parentliid");
            if (parentliid) {
                parentId = parentliid;
            }
            dataS = dataS +"&parentId=" + parentId;

        } else {
            //组织评论数据
            custName  = loginName;
        }

        dataS =dataS+ "&custName="+custName;
        //校验禁言
        if(gaytool){
            gaytool.updateSessionStorageGay(vpid,content);
        }

        $.ajaxp({
            url:config.zosSvrC+"/zos/comments/add?callback=?"+dataS,
            data:{}
            ,type:"GET"
            ,dataType:"text/json"
            ,success:function(resp){
                $this.removeClass("loading");
 /*               checkelement[0].checked=false;*/
                if(resp.code === "0000" && resp.data.opStatus ==="1"){

                    //初始化评论内容
                    if(flag === "1") {
                        //回复评论
                        //组织数据
                        var id = parentId;
                        var item = {};
                        item.CUST_NAME = custName;
                        item.SUBMIT_DATETIME = resp.data.subTime;
                        item.CONTENT = content
                        item.ID = resp.data.id;
                        var clickElement = $("#" + parentId);
                        var parentliid = clickElement.data("parentliid");
                        if (parentliid) {
                             id = parentliid;
                            item.parentliid =parentliid;
                        }
                        else{
                            item.parentliid = parentId;
                        }
                        comments.addCommentItem(item,id);
                        //回复评论请求回调
                        //追加数据到后台
                        //找到评论触发事件
                      //  var parentId =  $this.data("parentId");

                 /*       var pName = $this.data("pName");*/

                        //最后清空元素
                        clickElement.data("oldText","");
                        $this.data("pName","");
                        $this.data("parentId","");

                        $(".commentFoot .open .text").val("");

                    }
                    else{
                        //评论
                        var item={} ;
                        item.CUST_NAME =custName;
                        item.SUBMIT_DATETIME =resp.data.subTime;
                        item.CONTENT = content
                        item.ID = resp.data.id;
                        item.UPWARD_CNT = 0;
                        //追加数据到后台
                        comments.addCommentItem(item,"");
                        $(".commentFoot .open .text").val("");
                    /*    var textArea = $(".commentFoot .l .text");
                        textArea.data("pViewText","");
                        textArea.val('');*/
                    }
                    hideCom();
                }else{
                    $this.removeClass("loading");
                   // alert(resp.msg);
                    console.log(resp.msg);
                    var dialog_relogin_2 = new dialog().know("您的评论包含敏感信息，请修改后再提交", '知道了', function () {//resp.msg
                    });
                }
            }
            ,error:function(error){
                $this.removeClass("loading");
               // alert(msg);
                console.log(error);
                var msg = error.message.substring(5);
                msg = msg+",请修改！"

                var dialog_relogin_2 = new dialog().know(msg, '知道了', function () {
                });
            }
        });

    });
    //发送评论前检查框架协议
    function checkProtocol(){

    }
    //赞事件
    $(".commentFoot").delegate(".zanButton", "click", function(){
        zanFn();
    });
    //踩事件
    $(".commentFoot").delegate(".caiButton", "click", function(){
        caiFn();
    });


    //赞事件
    function zanFn(){
        //校验是否已赞操作
        var giveZan = $(".commentFoot .zanButton");
        if(  giveZan.hasClass("loading")){
            return false;
        }
        var opt = "zan";
        if(giveZan.hasClass("giveZan")){
        	opt = "qxzan";
        }
        giveZan.addClass("loading");
        var vpId = 	$('#viewId').val();
        //##########################################################################
        $.ajaxp({
            url: config.zosSvrC + "/zos/view/approve?callback=?&opt="+opt+"&vpId="+vpId
            , type: "post"
            , dataType: "json"
            ,data:{}
            , success:  function(resp){
                if(resp.code=="0000"){
                    giveZan.removeClass("loading");
                    var z =	$(".commentFoot .z");
                    
                    if(opt == "zan"){
                    	//变已赞图标
                        $(".commentFoot .zanButton").addClass("giveZan");
                        $(".commentFoot .zanButton img").attr("src","images/zanok.png");
                        
                        z .text(parseInt(z.text())+1);
                    }else{
                    	//变已赞图标
                        $(".commentFoot .zanButton").removeClass("giveZan");
                        $(".commentFoot .zanButton img").attr("src","images/zan.png");
                        z .text(parseInt(z.text())-1);
                    }
                    
                }
            }
            , error: function (err) {
                giveZan.removeClass("loading");
                console.log("error");
            }

        });
    }
    //踩事件
    function caiFn(){
        //校验是否已赞操作
        var giveCai = $(".commentFoot .caiButton");
        if(giveCai.hasClass("giveCai") ||  giveCai.hasClass("loading")){
            return false;
        }
        giveCai.addClass("loading");
        var vpId = 	$('#viewId').val();
        //##########################################################################
        $.ajaxp({
            url: config.zosSvrC + "/zos/view/disapprove?callback=?&vpId="+vpId
            , type: "post"
            , dataType: "json"
            ,data:{}
            , success: function(resp){
                if(resp.code=="0000"){
                    giveCai.removeClass("loading");
                    //变已踩图标
                    $(".commentFoot .caiButton").addClass("giveCai");
                    $(".commentFoot .caiButton img").attr("src","images/chaok.png");
                    var c =	$(".commentFoot .c");
                    c .text(parseInt(c.text())+1);
                }
            }
            , error: function (err) {
                giveCai.removeClass("loading");
                console.log("error");
            }

        });

    }


     gaytool = new gayToolManager();
    gaytool.updateGay(vpid);
    //end init
}

function recalcCommentFootWidth() {

    // 计算输入框的宽度
    var clientWidth = document.documentElement.clientWidth;

    var fontSize = parseFloat($(".commentFoot").css("font-size"));
    var totalWidth = fontSize * 3.25;
    totalWidth += $(".commentFoot .r").width();
    
    // 屏幕宽度 － 容器padding － 右侧固定宽度 － 内部对象右padding
    $(".commentFoot .l").width(clientWidth - totalWidth);

}
//打开评论对话框，发表评论
function openComment(){
    // 默认打开勾选协议
    /*    var checkelement =   $(".commentFoot .protocol .checkbox");
    checkelement[0].checked = true;*/

    $(".page").addClass("on-comment-editing");
    var headSection = $(".page header.header_small");
    if (headSection.length > 0) {
        var headerBackground = headSection.css("background-color");
        headSection.data("background", headerBackground);
        headSection.addClass("initRed");
    }

    // 回退按钮调整
    var title = $(".page > header .title");
    // title.css({"font-size":"0.8rem"});
    var title_t = title.text();
    if (title_t == "写评论") {
        return false;
    }
    var back = $(".page > header .back");
    back.data("oldValue", back.css("display"));
    back.hide();

    $(".page > header .backComment").show();

    // 标题修改
    title.data("oldValue",title.text());
    title.text("写评论");

    // 打开发送，隐藏分享
    var fenxiang =  $(".page > header .fenxiang");
    fenxiang.data("oldValue", fenxiang.css("display"));
    fenxiang.hide();

    $(".page > header .send").show();
    $(".commentFoot .l").hide();
    $(".commentFoot .r").hide();

    // 打开编辑框
    var el =  $(".commentFoot .open").show();

    // 打开协议
    $(".commentFoot .protocol").show();


    $(".commentFoot").addClass("active");



    $(".page-body").hide();
    $(window).scrollTop(200);
    //光标移动到最后
    var el = $(".commentFoot .open .text")[0];
    var appleMobileFlag = isAppleMobile();
    if(!appleMobileFlag){
      /*      window.setTimeout(function() {
         moveCaretToEnd(el);
         }, 1);*/
        //判断是否分享的界面，如果是，不能自动获取焦点
        if(bShare){

        }else{
            window.setTimeout(function() {
                // el.focus();
            }, 2);
        }

    }
    else{
        //苹果手机端

    }
   // alert("打开2");

}
//隐藏评论
function hideCom(){
    $(".page").removeClass("on-comment-editing")
    var headSection = $(".page header");
    var background = headSection.data("background");
    if(background){

        headSection.addClass("header_small");
        headSection.removeClass("initRed");
        headSection.data("background","");
    }



    //  hideCommentTimeOut.timeOutO =  setTimeout(after,100);
    // console.log("0:"+hideCommentTimeOut.timeOutO);
    $(".page > header .send").removeClass("loading");
/*    var checkelement =   $(".commentFoot .protocol .checkbox");
    checkelement[0].checked = false;*/
    after();
    hideComment();
    function after(){
        var $thisedit =  $(".commentFoot .open .text");
        var sendElement =  $(".page > header .send");
        var flag = sendElement.data("flag");
        var pText =  $thisedit.val();
        var $thisread =  $(".commentFoot .l .text");
        if(flag =="1"){
            //回复评论内容-失去焦点时，把输入框中的评论内容保存到对应评论下
            var parentId = sendElement.data("parentId");
            var clickElement = $("#" + parentId);
            if (clickElement.length > 0){
                clickElement.data("oldText",pText);
            }

            //回复评论观点内容到评论输入框中

            var pViewText = $thisread.data("pViewText");

            if (pViewText) {
                $thisread.val(pViewText);
            } else {
                $thisread.val("");
            }
        } else {
            //评论观点内容
            $thisread.data("pViewText", pText);
            $thisread.val(pText);
        }
        // console.log("flag=0");
        sendElement.data("flag", "");



    };
    //关闭评论对话框
    function hideComment(){
        //回退按钮调整
        var back = $(".page > header .back");
        back .css("display",back.data("oldValue"));
        $(".page > header .right ").css("width","2.5rem");
        $(".page > header .backComment").hide();
        //标题修改
        var title = $(".page > header .title");
        // title.css({"font-size":"1rem"});
        title.text(title.data("oldValue"));
        //隐藏发送，打开分享
        var fenxiang =  $(".page > header .fenxiang");
        fenxiang.css("display",  fenxiang.data("oldValue"));
        $(".page > header .send").hide();

        $(".commentFoot .l").show();
        $(".commentFoot .r").show();
        $(".commentFoot .open").hide();
        $(".commentFoot .protocol").hide();

        $(".commentFoot").removeClass("active");


     /*   $(".commentFoot .l .text").scrollTop(0);*/

        $(".page-body").show();
    }

};
//在壳外点击评论特殊处理事件
function openCommentOutApp(){
    var thisPageUrlInApp = URL.getWindowLocationHref();
    var dialog_err =  new dialog()
        .confirm2("<span class='err-info'>请下载中泰齐富通APP继续操作，若您已下载，可直接打开APP</span>",
        "打开", function(){

            openclient(thisPageUrlInApp);

        }, "立即下载", function(){
            //下载齐富通
            Share.downLoadApp();
        });
}

//自动打开齐富通app中店铺详情界面
function openclient() {
    var thisPageUrlInApp = URL.getWindowLocationHref();
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
        //打开某手机上的某个app应用
        var tempUrl = "com.tzt.zhongtai://url=" + encodeURIComponent(
            "http://action:10061/?type=9&&webtype=NoShowClientNav&&url=" + encodeURIComponent(thisPageUrlInApp));
        
        window.top.location = tempUrl;
    } else {
        var ifr = document.createElement('iframe');

        //尝试去启动齐富通
        var tempUrl = "com.tzt.zhongtai://url=" + encodeURIComponent(
            "http://action:10061/?type=9&&webtype=NoShowClientNav&&url=" + encodeURIComponent(thisPageUrlInApp));

        ifr.src = tempUrl;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    }

};
//打开评论焦点自动到对话框尾部
function moveCaretToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}


//格式化时间
function getDataBYtime(time){
    var sf = time.substring(11,16);
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;




    if (currentdate == time.substring(0, 10)) {
        return "今天 " + sf;
    } else {
        return time.substring(5, 10) + " " + sf;
    }
}

function isAppleMobile(){
    var flag = false;
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
        flag = true;
    }
    return flag;
}



module.exports.initCommentFoot = initCommentFoot;
module.exports.openComment = openComment;
module.exports.hideCom = hideCom;
module.exports.hideCommentTimeOut = hideCommentTimeOut;
module.exports.isAppleMobile = isAppleMobile;

