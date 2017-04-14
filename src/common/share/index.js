/**
 * Created by lee on 2016/4/8.
 *
 * 微店列表公共代码
 */


var config = require("common/config");
var URL = require("common/url");
var dialog = require("common/dialog");
var staticStr=require("common/static");

require("./share.css");

var app_config = {
    /*scheme:必须*/
    scheme_url: 'com.tzt.zhongtai://',
    download_url_IOS:'https://itunes.apple.com/cn/app/zhong-tai-qi-fu-tong-zhuan/id961528851?mt=8',
    download_url_Adr:'https://reg.95538.cn/download/ztqftpro/ztqft.apk',
    timeout: 500
};

/**
 * 是否打开的是分享链接
*/
function isShare()
{
    var bShare = false;//是否打开的分享地址
    var params = URL.getParamFromUrl(URL.getWindowLocationHref()).params;
    if(params.share != undefined){
        bShare = true;
    }
    return bShare;
}

/**
 * 是否在齐富通客户端内
 */
function isInQiFuTong()
{
    var bInShell = false;//是否在壳内
    if (navigator.userAgent.match(/(www.tzt.cn|qifutong)/i)) {
        bInShell = true;
    }
    return bInShell;
}

/**
 * 是否显示遮罩层
 */

function isShowBlockTip()
{
    var bShow = false;//是否显示遮罩
    var userAgent = navigator.userAgent.toLowerCase();//获取判断用的对象
    if(userAgent.match(/MicroMessenger/i) || userAgent.match(/WeiBo/i)  || userAgent.match(/qqbrowser.*qq/ig) ||(userAgent.match(/qq/i) && !userAgent.match(/qqbrowser/i))){
        //微信浏览器
        //新浪微博
        //在QQ空间打开

        bShow = true;
    }
    return bShow;
}
function showBlockTip()
{

    var downloadBannar= $('<div class="wxtip" id="JweixinTip"><span class="wxtip-icon"></span><p class="wxtip-txt">点击右上角<br/>选择在浏览器中打开</p></div>');
    downloadBannar.appendTo("body");
    document.getElementById('JweixinTip').style.display='block';

}


/**
 * 自动打开齐富通app 对应的url  例如：店铺详情
 */
 function openclient(thisPageUrlInApp) {

    var tempUrl="com.tzt.zhongtai://url="+encodeURIComponent("http://action:10061/?type=9&&webtype=NoShowClientNav&&url="+encodeURIComponent(thisPageUrlInApp));//打开某手机上的某个app应用
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i))
    {
        window.top.location=tempUrl;
    }
    else
    {
        var ifr = document.createElement('iframe');
        //尝试去启动齐富通
        ifr.src=tempUrl;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    }

};
/**
 * 自动打开齐富通app中产品详情
 */
function openClientProduct(url,detail) {

    var params = URL.getParamFromUrl(url).params;
    var producturl=config.zosCust;
    if(detail.XQZSFS == 1){//基金
        producturl = producturl+"/product-licai-noHuobiJijinDetail.html?bShowAdd=1&share=1&cpdm="+detail.CPDM +"&user="+params.user+"&shop="+params.shop;
    }else if(detail.XQZSFS == 2){
        producturl = producturl+"/product-licai-huobiJijinDetail.html?bShowAdd=1&share=1&cpdm="+detail.CPDM +"&user="+params.user+"&shop="+params.shop;
    }else if(detail.XQZSFS == 3){
        producturl =producturl+"/product-licai-dingqiLicaiDetail.html?bShowAdd=1&share=1&cpdm="+detail.CPDM +"&user="+params.user+"&shop="+params.shop;
    }

    if(detail.CPLY == 1){
        //开放式基金 即集中交易
        var tempName=detail.CPMC+"【"+detail.CPDM+"】";
        var secondurl="http://action:10055/?url="+producturl+"&&imageUrl=&&title="+tempName+"&&message="+staticStr.SHARE_PRODUCT_MESSAGE;
        secondurl=encodeURIComponent(secondurl);

        var actionurl="http://action:10061/?fullscreen=1&&url=/zdb/item/licai/app/jj/info.html?code="+detail.CPDM+"&name="+detail.CPMC+"&shopid="+this.shop+"&empid="+params.user+"&&title="+detail.CPMC+"&&type=99&&secondtext=分享&&secondurl="+secondurl;
        actionurl=encodeURIComponent(actionurl);
        var href="http://action:10090/?logintype=1&&loginkind=2&&url="+actionurl;

        openclientWithTitle(href,detail.CPMC);
    }else if(detail.CPLY == 2){
        //otc
        var tempName=detail.CPMC+"【"+detail.CPDM+"】";
        var secondurl="http://action:10055/?url="+producturl+"&&imageUrl=&&title="+tempName+"&&message="+staticStr.SHARE_PRODUCT_MESSAGE;
        secondurl=encodeURIComponent(secondurl);

        var actionurl="http://action:10061/?fullscreen=1&&url=/zdb/item/licai/app/otc/info.html?code="+detail.CPDM+"&name="+detail.CPMC+"&shopid="+this.shop+"&empid="+params.user+"&&title="+detail.CPMC+"&&type=99&&secondtext=分享&&secondurl="+secondurl;
        actionurl=encodeURIComponent(actionurl);
        var href="http://action:10090/?logintype=1&&loginkind=2&&url="+actionurl;

        openclientWithTitle(href,detail.CPMC);
    }
    else if(detail.CPLY == 3){
        //场内
        var href = "http://stock:"+detail.CPDM;
        openclient2(href);
    }

};

/**
 * 自动打开齐富通app中 对应url+title  例如：产品详情
 */
function openclientWithTitle(thisPageUrlInApp,title) {

    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i))
    {
        var tempUrl="com.tzt.zhongtai://url="+encodeURIComponent("http://action:10061/?type=9&&url="+encodeURIComponent(thisPageUrlInApp));//打开某手机上的某个app应用
        window.top.location=tempUrl;
    }
    else
    {
        var ifr = document.createElement('iframe');

        //尝试去启动齐富通
        var tempUrl="com.tzt.zhongtai://url="+encodeURIComponent("http://action:10061/?type=9&&title="+ title+"&&url="+encodeURIComponent(thisPageUrlInApp));//打开某手机上的某个app应用
        ifr.src=tempUrl;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    }

};

/**
 * 自动打开齐富通app中场内基金
 */
function openclient2(thisPageUrlInApp) {


    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i))
    {
        var tempUrl="com.tzt.zhongtai://url="+encodeURIComponent(thisPageUrlInApp);
        window.top.location=tempUrl;
    }
    else
    {
        var ifr = document.createElement('iframe');

        //尝试去启动齐富通
        var tempUrl="com.tzt.zhongtai://url="+encodeURIComponent(thisPageUrlInApp);
        ifr.src=tempUrl;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    }

};

/**
 * 下载齐富通app
 */

function downLoadApp() {

    window.top.location="http://www.95538.cn/download/mobile/ztqft_pro.aspx";

    /**
    *  2016.9.13 下载改成调用齐富通的下载界面
    * *
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
        window.top.location = app_config.download_url_IOS;//需修改齐富通在appstore的连接
    }else{
        if (navigator.userAgent.match(/android/i)) {
            window.top.location = app_config.download_url_Adr;//需修改齐富通在cdn的下载地址
        }

    }
    */
};

/**
 * 下载和打开齐富通提示框
 */
function showDownLoadAppDialog(thisPageUrlInApp) {
    var dialog_err =  new dialog()
        .confirm2("<span class='err-info'>请下载中泰齐富通APP继续操作，若您已下载，可直接打开APP</span>",
        "打开", function(){

            openclient(thisPageUrlInApp);

        }, "立即下载", function(){
            //下载齐富通
            downLoadApp();
        });
};

function showDownLoadAppDialogWithTitle(thisPageUrlInApp,title) {
    if(title=="")
    {
        var dialog_err =  new dialog()
            .confirm2("<span class='err-info'>请下载中泰齐富通APP继续操作，若您已下载，可直接打开APP</span>",
            "打开", function(){

                openclient(thisPageUrlInApp);

            }, "立即下载", function(){
                //下载齐富通
                downLoadApp();
            });
    }
    else
    {
        var dialog_err =  new dialog()
            .confirm2(title,
            "打开", function(){

                openclient(thisPageUrlInApp);

            }, "立即下载", function(){
                //下载齐富通
                downLoadApp();
            });
    }

};
/**
 * 下载和打开齐富通提示框 在产品界面中调用
 */
function showDownLoadAppDialogProduct(thisPageUrlInApp,detail) {
    var dialog_err =  new dialog()
        .confirm2("<span class='err-info'>请下载中泰齐富通APP继续操作，若您已下载，可直接打开APP</span>",
        "打开", function(){

            openClientProduct(thisPageUrlInApp,detail);

        }, "立即下载", function(){
            //下载齐富通
            downLoadApp();
        });
};


/**
 * 显示底部下载浮动框
 */
function showDownLoad()
{

    //var downloadBannar= $('<div id="jud79"> <div id="jud79_1"> <div class="jud79_2"></div> <div class="jud79_3"><p>中泰齐富通</p> <p><em>打开中泰之门 开启财富人生</em></p></div> <span class="jud79_4">立即下载</span></div> </div>');
    //downloadBannar.appendTo("body");

    var downloadBannar= $('<div class="footer footer-share"><div class="op"></div><img src="images-ext/logo.png" alt="内容图片" class="foot-img fl"><div class="text fl"><p class="text-p1">中泰齐富通</p><p class="text-p2">打开中泰之门 开启财富人生</p></div><div class="download fr"><a class="btn fl" href="http://www.95538.cn/download/mobile/ztqft_pro.aspx">立即下载</a><img src="images-ext/close.png" alt="内容图片" class="close fl close-share"></div></div>');
    downloadBannar.appendTo("body");
    ///**
    // * 下载或是启动app
    // */
    //$(".jud79_4").on("click",function(){
    //    downLoadApp();
    //});
    //
    //var footIcon= $('<img src="images-ext/qft-500.png" style="width:100%;height: auto;opacity: 0;position: absolute;z-index: -1;">');
    //footIcon.appendTo("body");

    var btn=document.getElementsByClassName("close-share").item(0);
    var foot=document.getElementsByClassName("footer-share").item(0);
    btn.onclick=function(){
        foot.style.display="none";
        $(".page").css("bottom","0rem");
    }

}


/**
 * 分享web 上下广告位
 */
function showBannar()
{
    var bInShell =isInQiFuTong();//是否在壳内
    var bShare = isShare();//是否打开的分享地址
    if(bShare && !bInShell)
    {

        showDownLoad();
        $.ajaxp({
            url: config.zosSvrC + "/zos/common/getBannerSrcList?callback=?&appId=weidian&addrId=qft_xz_banner"
            , type: "GET"
            , dataType: "json"
            , data:{}
            , success: showBannarView
            , error: function(){

            }
        });
    }

};

function showBannarView(resp)
{
    if (resp.code === "0000")
    {
        var bannarArray=resp.data;

        bannarArray.forEach(function(tempBannarInfo){



             if(tempBannarInfo.SEQ_ID=="1")
             {
                 var bannarInfo=tempBannarInfo;
                 //上 广告位
                 var topBannar = $('<div class="top_bannar"> <div id="topBannarClose" class="closeImg"></div> <img class="bannar_img" src=""> </div>');
                 topBannar.prependTo(".page-body");

                 $(".top_bannar img").attr("src",bannarInfo.CONTENT);

                 $('.top_bannar').bind("click",function()
                 {
                     window.top.location=bannarInfo.LINK_URL;
                     return false;

                 });
                 $('#topBannarClose').bind("click",function()
                 {
                     $('.top_bannar').remove();
                     return false;

                 });
             }
            else if(tempBannarInfo.SEQ_ID=="2")
             {
                 var bannarInfo=tempBannarInfo;
                 //下 广告位
                 var bottomBannar= $('<div class="bottom_bannar"> <div  id="buttonBannarClose" class="closeImg"></div> <img class="bannar_img"  src=""> </div>');
                 bottomBannar.appendTo("body");
                 $(".bottom_bannar img").attr("src",bannarInfo.CONTENT);
                 $('.bottom_bannar').bind("click",function()
                 {

                     window.top.location=bannarInfo.LINK_URL;
                     return false;

                 });
                 $('#buttonBannarClose').bind("click",function()
                 {
                     $('.bottom_bannar').remove();
                     return false;
                 });
             }
        });
    }

};

module.exports.isShare = isShare;
module.exports.isInQiFuTong = isInQiFuTong;
module.exports.isShowBlockTip = isShowBlockTip;
module.exports.showBlockTip = showBlockTip;

module.exports.downLoadApp = downLoadApp;
module.exports.openclient = openclient;
module.exports.openClientProduct = openClientProduct;


module.exports.showDownLoadAppDialog = showDownLoadAppDialog;
module.exports.showDownLoadAppDialogWithTitle = showDownLoadAppDialogWithTitle;
module.exports.showDownLoadAppDialogProduct = showDownLoadAppDialogProduct;

module.exports.showBannar = showBannar;
module.exports.showDownLoad = showDownLoad;

