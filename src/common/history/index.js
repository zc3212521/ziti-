/**
 * Created by lee on 16-3-17.
 */
//window.APP_HISTORY = true;

window.back = function(){
    if(navigator.userAgent.match(/(www.tzt.cn|qifutong)/i)){
        window.top.location.href = "http://action:10002/";
    }else{
        history.back();
    }
};
var $ = require("common/zepto");

/**
 * hack解决fastclick库引起的android4.3以下出现点击两次的情况
 */
function stopClick(){
    // console.log("start hack-click2",Date.now());
    $("body").append("<div class='hack-click2'></div>");
    setTimeout(function(){
        $(".hack-click2").remove();
        // console.log("remove hack-click2",Date.now());
    },400);

    //HackCode阻止弹出iframe滑动到底部后再滑动导致父window内容滑动
    //if(window.location.href.substring(window.location.href.lastIndexOf("/") + 1,window.location.href.indexOf(".html")+5) == "square.html"){
    //    $(".page").css("display","block");
    //}
    //HackCode
}

window.stopClick = stopClick;

stopClick();

/**
 * 波动返回按钮处理
 */
(function(){
    var $ = require("common/zepto");
    var canvas = {},
        centerX = 0,
        centerY = 0,
        color = '',
        containers = document.getElementsByClassName('material-design')
    context = {},
        element = {},
        radius = 0,

        requestAnimFrame = function () {
            return (
                window.requestAnimationFrame       ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        } (),

        initCanvas = function () {
            containers = Array.prototype.slice.call(containers);
            for (var i = 0; i < containers.length; i += 1) {
                canvas = document.createElement('canvas');
                canvas.addEventListener('click', press, false);
                containers[i].appendChild(canvas);
                canvas.style.width ='100%';
                canvas.style.height='100%';
                canvas.width  = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
        },

        press = function (event) {
            color = event.toElement.parentElement.dataset.color;
            element = event.toElement;
            context = element.getContext('2d');
            radius = 0;
            centerX = canvas.width/2;
            centerY = canvas.height/2;
            context.clearRect(0, 0, element.width, element.height);
            draw();
        },

        draw = function () {
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
            radius += 2;
            if (radius < element.width) {
                requestAnimFrame(draw);
            }else{
                clea();
            }
        };
    clea = function (){
        var context=canvas.getContext("2d");
        context.clearRect(0,0,canvas.width,canvas.height);
        context.beginPath();
    };
    initCanvas();

})();