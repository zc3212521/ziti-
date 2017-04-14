/**
 * Created by lee on 16-3-14.
 */

var config = require("common/config");
var staticStr=require("common/static");

module.exports = function(){

    /*
    var href = "";
    if(this.XQZSFS == 1){//基金
        href = "product-licai-noHuobiJijinDetail.html?bShowAdd=1&cpdm="+this.CPDM;
    }else if(this.XQZSFS == 2){
        href = "product-licai-huobiJijinDetail.html?bShowAdd=1&cpdm="+this.CPDM;
    }else if(this.XQZSFS == 3){
        href = "product-licai-dingqiLicaiDetail.html?bShowAdd=1&cpdm="+this.CPDM;
    }

    return href;
    */


   if(this.isinshell)
   {
       var producturl=config.zosCust;
       if(this.XQZSFS == 1){//基金
           producturl = producturl+"/product-licai-noHuobiJijinDetail.html?bShowAdd=1&cpdm="+this.CPDM +"&user="+this.userId+"&shop="+this.shopId;
       }else if(this.XQZSFS == 2){
           producturl = producturl+"/product-licai-huobiJijinDetail.html?bShowAdd=1&cpdm="+this.CPDM +"&user="+this.userId+"&shop="+this.shopId;
       }else if(this.XQZSFS == 3){
           producturl =producturl+"/product-licai-dingqiLicaiDetail.html?bShowAdd=1&cpdm="+this.CPDM +"&user="+this.userId+"&shop="+this.shopId;
       }

       var href = "";
       if(this.CPLY == 1){
           //开放式基金 即集中交易
           // href = "http://action:10061/?secondtype=9&&fullscreen=1&&url=/zdb/item/licai/app/jj/info.html?code="+this.CPDM+"&name="+this.CPMC+"&&title="+this.CPMC;

           producturl=producturl+"&share=1";
           //
           var tempName=this.CPMC+"【"+this.CPDM+"】";

           var secondurl="http://action:10055/?zttype=wd&&url="+producturl+"&&imageUrl=&&title="+tempName+"&&message="+staticStr.SHARE_PRODUCT_MESSAGE;
           secondurl=encodeURIComponent(secondurl);

           var actionurl="http://action:10061/?fullscreen=1&&url=/zdb/item/licai/app/jj/info.html?code="+this.CPDM+"&name="+this.CPMC+"&shopid="+this.shopId+"&empid="+this.userId+"&&title="+this.CPMC+"&&type=99&&secondtext=分享&&secondurl="+secondurl;
           actionurl=encodeURIComponent(actionurl);
           href="http://action:10090/?logintype=1&&loginkind=2&&url="+actionurl;


       }else if(this.CPLY == 2){
           //otc
           //href = "http://action:10090/?logintype=1&&loginkind=2&&url=http://action:10061/?secondtype=9&&fullscreen=1&&url=/zdb/item/licai/app/otc/info.html?code="+this.CPDM+"&name="+this.CPMC+"&&title="+this.CPMC;

           producturl=producturl+"&share=1";
           var tempName=this.CPMC+"【"+this.CPDM+"】";
           var secondurl="http://action:10055/?zttype=wd&&url="+producturl+"&&imageUrl=&&title="+tempName+"&&message="+staticStr.SHARE_PRODUCT_MESSAGE;
           secondurl=encodeURIComponent(secondurl);

           var actionurl="http://action:10061/?fullscreen=1&&url=/zdb/item/licai/app/otc/info.html?code="+this.CPDM+"&name="+this.CPMC+"&shopid="+this.shopId+"&empid="+this.userId+"&&title="+this.CPMC+"&&type=99&&secondtext=分享&&secondurl="+secondurl;
           actionurl=encodeURIComponent(actionurl);
           href="http://action:10090/?logintype=1&&loginkind=2&&url="+actionurl;

       }
       else if(this.CPLY == 3){
           //场内
           href = "http://stock:"+this.CPDM;

       }
       else{
           if(this.XQZSFS == 1){//基金
               href = "product-licai-noHuobiJijinDetail.html?bShowAdd=1&cpdm="+this.CPDM+"&user="+this.userId+"&shop="+this.shopId;
           }else if(this.XQZSFS == 2){
               href = "product-licai-huobiJijinDetail.html?bShowAdd=1&cpdm="+this.CPDM+"&user="+this.userId+"&shop="+this.shopId;
           }else if(this.XQZSFS == 3){
               href = "product-licai-dingqiLicaiDetail.html?bShowAdd=1&cpdm="+this.CPDM+"&user="+this.userId+"&shop="+this.shopId;
           }
       }


       return href;

   }
    else
   {

       var href = "";
       if(this.XQZSFS == 1){//基金
           href = "product-licai-noHuobiJijinDetail.html?bShowAdd=1&cpdm="+this.CPDM+"&user="+this.userId+"&shop="+this.shopId;
       }else if(this.XQZSFS == 2){
           href = "product-licai-huobiJijinDetail.html?bShowAdd=1&cpdm="+this.CPDM+"&user="+this.userId+"&shop="+this.shopId;
       }else if(this.XQZSFS == 3){
           href = "product-licai-dingqiLicaiDetail.html?bShowAdd=1&cpdm="+this.CPDM+"&user="+this.userId+"&shop="+this.shopId;
       }
       return href;


   }



};