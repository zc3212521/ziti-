/**
 * Created by lee on 16-3-11.
 */

require("./scroll-list.css");
var IScroll = require("common/iscroll").iScroll;
var config = require("common/config");


function scrollList(idStr,opts){
    opts = opts || {};

    var isEnd = false;
    //处理正在加载动画
    if(typeof opts.hasLoading != "undefined" && opts.hasLoading){
        var scroller = $("#" + idStr + " .scroller");
        var pullDown = scroller.find(".pullDown").remove();
        var pullUp = scroller.find(".pullUp").remove();
        pullDown = $('<div class="pullDown"><div class="pull-box"><span class="pullDownIcon">&nbsp;</span><span class="pullDownLabel">下拉显示最新...</span></div></div>')
        pullUp = $('<div class="pullUp"><div class="pull-box"><span class="pullUpIcon">&nbsp;</span><span class="pullUpLabel">上拉加载更多...</span></div></div>')
        scroller.prepend(pullDown);
        scroller.append(pullUp);
        var pullDownOffset = pullDown.height();
        var pullUpOffset = pullUp.height();
        var topOffset = opts.topOffset = pullDownOffset;


        opts.onRefresh = function(){
            if (pullDown.hasClass('loading1')) {
                pullDown.removeClass("loading1");
                pullDown.find('.pullDownLabel').text('下拉显示最新...');
            } else if (pullUp.hasClass('loading1')) {
                pullUp.removeClass("loading1");
                pullUp.find('.pullUpLabel').text('上拉加载更多...');
                pullUp.find(".pullUpLabel").off(config.CLICK);
            }
        };

        opts.onScrollMove = function(){
            //console.log("onScrollMove:",this.y);
            //判断手指到底部时，回拉
            if((this.y < this.maxScrollY) && (this.pointY < 1)){
                this.scrollTo(0, this.maxScrollY, 400);
                return;
            } else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
                this.scrollTo(0, 0, 400);
                return;
            }
            //下拉
            if (this.y > 5 && !pullDown.hasClass('flip')) {
                console.log("move:",this.y,topOffset,this.maxScrollY);
                console.log("111");
                pullDown.addClass('flip');
                pullDown.find('.pullDownLabel').text('释放显示最新...');
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDown.hasClass('flip')) {
                console.log("move:",this.y,topOffset,this.maxScrollY);
                console.log("222");
                pullDown.removeClass("flip");
                pullDown.find('.pullDownLabel').text('下拉显示最新...');
                this.minScrollY = -pullDownOffset;

            //上拉
            } else if (!isEnd && this.y < (this.maxScrollY - 5) && !pullUp.hasClass('flip')) {
                console.log("move:",this.y,topOffset,this.maxScrollY);
                console.log("333");
                pullUp.addClass('flip');
                pullUp.find('.pullUpLabel').text('释放加载更多...');
                this.maxScrollY = this.maxScrollY;
            } else if (!isEnd && this.y > (this.maxScrollY + 5) && pullUp.hasClass('flip')) {
                console.log("move:",this.y,topOffset,this.maxScrollY);
                console.log("444");
                pullUp.removeClass("flip");
                pullUp.find('.pullUpLabel').text('上拉加载更多...');
                this.maxScrollY = pullUpOffset;
            }

        };

        opts.onScrollEnd = function(){
            console.log("onScrollEnd:",this.y);
            if (pullDown.hasClass('flip')) {
                pullDown.removeClass("flip").addClass('loading1');
                pullDown.find('.pullDownLabel').text('正在加载...');
                if(opts.pullDownAction){
                    opts.pullDownAction.apply(opts);
                }
            } else if (!isEnd && pullUp.hasClass('flip')) {
                pullUp.removeClass("flip").addClass('loading1');
                pullUp.find('.pullUpLabel').text('正在加载...');
                if(opts.pullUpAction){
                    opts.pullUpAction.apply(opts);
                }
            }

        };


    }

    //默认隐藏水平和垂直的滚动条
    opts.hScrollbar = typeof opts.hScrollbar === "undefined"?false:opts.hScrollbar;
    opts.vScrollbar = typeof opts.vScrollbar === "undefined"?false:opts.vScrollbar;




    var scroll = new IScroll(idStr,opts);

    scroll.isEnd = function(boo,msg){
        msg = msg||"已经到达底部了！"

        var scroller = $("#" + idStr + " .scroller");
        var pullUp = scroller.find(".pullUp");

        if(boo && pullUp.length<=0){
            pullUp = $('<div class="pullUp"><div class="pull-box"><span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span></div></div>')
            scroller.append(pullUp);
        }


        if(boo){
            pullUp.find('.pullUpLabel').text(msg);
            pullUp.find(".pullUpIcon").css("display","none");
        }else{
            pullUp.find('.pullUpLabel').text("上拉加载更多...");
            pullUp.find(".pullUpIcon").css("display","inline-block");
        }

        isEnd = boo;
    };

    scroll.setEndOnClickHandler = function(onClickHandler) {
        var scroller = $("#" + idStr + " .scroller");
        var endLable = scroller.find(".pullUp .pullUpLabel");
        if (onClickHandler) {
            endLable.one(config.CLICK, onClickHandler);
        } else {
            endLable.off(config.CLICK);
        }
    }

    return scroll;
}




module.exports = scrollList;