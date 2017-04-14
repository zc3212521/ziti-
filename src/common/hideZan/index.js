/**
 * Created by lee on 2016/4/8.
 *
 * 功能描述：如果带有赞操作的界面是手机壳外打开，隐藏掉赞div，电脑端调试需要sessionStorage.debug设为true
 */

var Share=require("common/share");
var bInShell =Share.isInQiFuTong();// 是否在壳内
// 电脑端调试使用，需要控制台设为true；
var debugFlag = sessionStorage.debug;


function init(){
	if(!bInShell && !debugFlag){
		$(".zanButton").hide();
		$(".zanCommentBtn").hide();

	}
}

module.exports.init = init;