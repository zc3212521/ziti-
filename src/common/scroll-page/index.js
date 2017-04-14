/**
 * Created by lee on 16-3-11.
 */

require("./scroll-page.css");
var IScroll = require("common/iscroll").iScroll;
var config = require("common/config");


function scrollList(idStr,opts){
    opts = opts || {};

    var isEnd = false;
    //处理正在加载动画
    if(typeof opts.hasLoading != "undefined" && opts.hasLoading){
        var scroller = $("#" + idStr + " .scroller");
        var pullDown = scroller.find(".pullDown").remove();
        pullDown = $('<div class="pullDown"><div class="pull-box"><span class="pullDownIcon">&nbsp;</span><span class="pullDownLabel">下拉刷新...</span></div></div>')
        scroller.prepend(pullDown);
        var pullDownOffset = pullDown.height();
        var topOffset = opts.topOffset = pullDownOffset;


        opts.onRefresh = function(){
            if (pullDown.hasClass('loading1')) {
                pullDown.removeClass("loading1");
                pullDown.find('.pullDownLabel').text('下拉刷新...');
            } 
        };

        opts.onScrollMove = function(){
        	//判断手指到底部时，回拉
        	if((this.y < this.maxScrollY) && (this.pointY < 1)){
                this.scrollTo(0, this.maxScrollY, 400);
                return;
            } else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
                this.scrollTo(0, 0, 400);
                return;
            }
            //下拉
            if (this.y > 40 && !pullDown.hasClass('flip')) {
                console.log("move:",this.y,topOffset,this.maxScrollY);
                console.log("111");
                pullDown.addClass('flip');
                pullDown.find('.pullDownLabel').text('释放刷新...');
                this.minScrollY = 0;
            } else if (this.y < 40 && pullDown.hasClass('flip')) {
                console.log("move:",this.y,topOffset,this.maxScrollY);
                console.log("222");
                pullDown.removeClass("flip");
                pullDown.find('.pullDownLabel').text('下拉刷新...');
                this.minScrollY = -pullDownOffset;
            }
        };

        opts.onScrollEnd = function(){
            if (pullDown.hasClass('flip')) {
                pullDown.removeClass("flip").addClass('loading1');
                pullDown.find('.pullDownLabel').text('正在加载...');
                if(opts.pullDownAction){
                    opts.pullDownAction.apply(opts);
                }
            }
        };


    }

    //默认隐藏水平和垂直的滚动条
    opts.hScrollbar = typeof opts.hScrollbar === "undefined"?false:opts.hScrollbar;
    opts.vScrollbar = typeof opts.vScrollbar === "undefined"?false:opts.vScrollbar;




    var scroll = new IScroll(idStr,opts);

    
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