/**
 * Created by lisg on 2016/3/5.
 * 用法：
 * var dialog = require("common/dialog")
 * var d = new dialog();
 * d.ok(callback);d.know(callback);d.confirm(callback);
 */

var config = require("common/config");
require("./dialog.css");
var $ = require("common/zepto");

function dialog() {
	$("body").append("<div id='dialog'><div id='top'></div><div id='bottom'></div></div><div id='bg'></div>")
	$("#dialog").addClass("dialog").css({"top": '30%', "left": "10%"});
};

/**
 * 显示
 */
dialog.prototype.show = function(){
	$("#dialog").css({"display": "block"});
	$("#bg").css({"display": "block"});
};

/**
 * 隐藏
 */
dialog.prototype.hide = function(){
	$("#dialog").css({"display": "none"});
	$("#bg").css({"display": "none"});
};

/**
 * 删除
 */
dialog.prototype.del = function(){
	$("#dialog").remove();
	$("#bg").remove();
};

function callback(d, c){
	if(c){
    	$("#dialog").on(config.CLICK,function(){
    		c();
    		d.del()
    	});
    	$("#bg").on(config.CLICK,function(){
    		c();
    		d.del()
    	});
    }else{
    	$("#dialog").on(config.CLICK,function(){
    		d.del()
    	});
    	$("#bg").on(config.CLICK,function(){
    		d.del();
    	})
    }
}
/**
 * 弹出成功对话框
 * @param msg 成功前面的字
 * @param callback dialog展现后，点击任何地方的回调函数，之后dialog删除
 */
dialog.prototype.ok = function(c){
//	if(!msg){
//		msg = '删除';
//	}
	$("#top").addClass("oktop");
	$("#bottom").addClass("bottom").html("删除成功");
    this.show();
    var d = this;
    callback(d, c)
};

/**
 * 弹出知道了对话框
 * @param msg 上面的字
 * @param callback dialog展现后，点击任何地方的回调函数，之后dialog删除
 */
dialog.prototype.know = function(msgTxt,btnTxt,c){
//	if(!msg){
//		msg = '删除';
//	}
	$("#top").addClass("top").html("<span></span>"+msgTxt);
	$("#bottom").addClass("know").html("<span></span>"+btnTxt);
    this.show();
    var d = this;
    callback(d, c)
};

/**
 * 确定对话框
 * @param callback 点击确定时触发的函数
 */
dialog.prototype.confirm = function(c){
//	if(!msg){
//		msg = '删除';
//	}
	$("#bottom").append("<div id='left'></div><div id='right'></div>").addClass("know")
	$("#top").addClass("top").html("<span></span>将产品删除将不可恢复，<br>确认要删除吗？")
	$("#left").addClass("left").html("<span></span>取消");
	$("#right").addClass("right").html("<span></span>删除");
    this.show();
    var d = this;
    if(c){
    	$("#left").on(config.CLICK,function(){
    		d.del()
    	});
    	$("#right").on(config.CLICK,function(){
    		c();
    		d.del()
    	});
    }else{
    	$("#left").on(config.CLICK,function(){
    		d.del()
    	});
    	$("#right").on(config.CLICK,function(){
    		d.del()
    	});
    }
};
/**
 * 确定对话框
 * @param callback 点击确定时触发的函数
 */
dialog.prototype.confirm2 = function(msgTxt, btn1, btnCallback, btn2, btnCallback2){
//  if(!msg){
//      msg = '删除';
//  }
	$("#bottom").append("<div id='left'></div><div id='right'></div>").addClass("know");
	$("#top").addClass("top").html("<span></span>" + msgTxt);
	$("#left").addClass("left").html("<span></span>" + btn1);
	$("#right").addClass("right").html("<span></span>" + btn2);
	this.show();
	var d = this;
	$("#left").on(config.CLICK, function(){
		if (btnCallback) {
			btnCallback();
		}
		d.del();
	});
	$("#right").on(config.CLICK,function(){
		if (btnCallback2) {
			btnCallback2();
		}
		d.del();
	});
	$("#bg").on(config.CLICK, function(){
		d.del();
	});
};
module.exports = dialog;