/**
 * Created by lee on 16-3-5.
 */

var $ = require("common/zepto");

var url = {
    /**
     * 给定href地址，获取地址页面部分和参数部分
     * @param href
     * @returns {{url: string, params: {}}}
     */
    getParamFromUrl:function(href){
        // //优先从url地址栏中取参数，如果url中本身没有，则检查sessionStorage中有无参数
        // if(href!=undefined && href.indexOf("?")==-1 && href.indexOf("=")==-1){
        //     href = window.sessionStorage._navUrl;
        // }
        // console.log('url跳转getParamFromUrl解析===》'+href);
        var param = {
            url:"",
            params:{}
        };
        if(href == undefined) return param;
        var endIndex = href.indexOf("?");
        if(endIndex>0){
            param.url = href.substr(0,endIndex);
            if(endIndex+1<href.length){
                var paramArr = href.substr(endIndex+1).split("&");
                for(var i in paramArr){
                    var kv = paramArr[i].split("=");
                    param.params[kv[0]] = kv[1];
                }
            }

        }else{
            param.url = href;
        }

        return param;
    }
    /**
     * 通过输入一个指定的urlObj包含地址和参数对象,返回一个拼接好query参数的URL字符串
     * @param urlObj
     * @returns {*}
     */
    ,getUrlFromObj:function(urlObj){
        var url = urlObj.url;
        var isFirst = true;
        for(var k in urlObj.params){
            if(urlObj.params.hasOwnProperty(k)){
                if(isFirst){
                    url+="?"
                    isFirst = false;
                }else{
                    url+="&"
                }
                url+=(k+"="+urlObj.params[k]);
            }
        }
        return url;
    }
    /**
     * 给一个超链接A的连接地址增加指定的参数，原来有的会被覆盖掉
     * @param selector
     * @param params
     */
    ,addParamToAlink:function(selector,paramObj){
        var a = $(selector);
        var newURL = this.addParamToUrl(a.attr("href"),paramObj);
        a.attr("href",newURL);
    }
    /**
     * 给一个URL增加指定的参数，原来有的会被覆盖掉
     * @param selector
     * @param params
     */
    ,addParamToUrl:function(url,paramObj){
        var urlObj = this.getParamFromUrl(url);
        for(var key in paramObj){
            if(paramObj.hasOwnProperty(key)){
                urlObj.params[key] = paramObj[key];
            }
        }
        var newURL = this.getUrlFromObj(urlObj);
        return newURL;
    }
    ,getParamFromSearch:function(sVar) {
      return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }
    ,getWindowLocationHref:function () {
        //封装window.location.href
        var href = window.location.href;
        if(window.innerUrl)return window.innerUrl;
        //优先从url地址栏中取参数，如果url中本身没有，则检查sessionStorage中有无参数
        if(href!=undefined && href.indexOf("?")==-1 && href.indexOf("=")==-1){
            if(window.sessionStorage._navUrl!=undefined && window.sessionStorage._navUrl!=null){
                href = window.sessionStorage._navUrl;
            }
        }

        window.innerUrl = href;
        return href;
    }
    ,passParamsByLocal:function(url) {
        var param = '';
        window.sessionStorage._navUrl = url;
        var a = url.split('?');
        if(a.length>1){
            url = a[0];
            param = a[1];
        }
        return url;
    }
    ,setWindowLocationHref:function(url) {
        url = this.passParamsByLocal(url);
        window.location.href = url;
    }
};

module.exports = url;