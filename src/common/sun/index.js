/**
 * Sun框架管理页面的整个生命周期
 *
 * @author lishg
 */

var Zepto = require("common/zepto");

Sun = (function($){
    var S = (typeof Sun) === "undefined" ? {} : Sun;

    S.version = "0.0.1";
    S.hasTouch = 'ontouchstart' in window;
    S.isMobile = $.os.ios || $.os.android;
    S.isIOS = $.os.ios;
    S.CLICK = S.hasTouch ? 'tap' : 'click';

    // String空处理
    S.empty = function(str) {
        if ( !str || str == "undefined" ) {
            str = ""
        }
        str += "";
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    // 打印输出Object的属性和值
    S.printObject = function(obj) {
        if (obj) {
            var out = "{\n";
            for (var key in obj) {
                out += ( key + ":" + obj[key] + ",\n" );
            }
            out = out.length > 3 ? out.slice(0, out.length - 3) + "\n" : out;
            out += "}\n";
            console.log(out);
        } else {
            console.log("SunError：对象不存在！");
        }
    }

    return S;
})(Zepto);

window.S = window.Sun = Sun;
/**
 * js调用javaNative接口封装
 */
~function(S) {
    S.callbacks = {};
    S.callbackId = Math.floor(Math.random() * 2000000000);

    S.addCallback = function(func) {
        var callbackId = "method" + (S.callbackId++);
        S.callbacks[callbackId] = func;
        return callbackId;
    }

    /**
     * 执行IOS本地通信
     * @param url
     * @returns {undefined|*}
     */
    S.execIframe = function (url) {
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", url);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
        var ret = window.returnValue;
        window.returnValue = undefined;
        if (ret) {
            return decodeURIComponent(ret);
        }
    }


    /**
     * 供js调用native的接口
     */
    S.callNative = function(method, argObj, callback) {
        if(!S.isMobile) return null;
        // 如果不存在回调则传递空
        try {
            if (!callback) {
                if (S.isIOS) {
                    return S.execIframe("oc:" + method + "::" + JSON.stringify(argObj));
                } else {
                    return S.exec(method,JSON.stringify(argObj), "");
                }
            } else {
                var callbackId = S.addCallback(callback);
                if (S.isIOS) {
                    return S.execIframe("oc:" + method + ":" + callbackId + ":" + JSON.stringify(argObj));
                } else {
                    return S.exec(method,JSON.stringify(argObj), callbackId);
                }
            }
        } catch(e) {
            console.log("SunError:" + e);
            return null;
        }
    }

    /**
     * 供native调用
     */
    S._exec = function(argJsonStr, callbackId) {
        var  callback = S.callbacks[callbackId];
        if (callback) {
            callback.apply(null, [JSON.parse(argJsonStr)]);
        } else {
            console.log("Error：no callback with callbackId " + callbackId);
        }
    }

}(Sun);

module.exports = Sun;
