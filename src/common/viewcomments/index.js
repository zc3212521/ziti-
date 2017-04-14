/**
 * Created by lee on 2016/4/8.
 *
 * 微店列表公共代码
 */

require("./vc.css");
var config = require("common/config");
var dialog = require("common/dialog");
var commentFoot = require("common/commentFoot");
var tpl_comments = require("./comments.tpl");
var tpl_comment_stdl = require("./comment-standalone.tpl");
var tpl_comment_reply = require("./comment-reply.tpl");

var currentPage = 1;
var containers = "commentdiv";
var itemId = "";
var rightSideWidth = 0;
var hideZan = require("common/hideZan");
var Anchor = require("../../chatroom/anchor.js");

// 加赞

$("body").delegate(".comment a.anchor", config.CLICK, Anchor.clickHandler);
$("body").delegate(".zanCommentBtn", config.CLICK, function(){
	
    var $this = $(this);
    if ($this.hasClass("loading") || $this.hasClass("zan")) return;
    $this.addClass("loading");
    $.ajaxp({
        url : config.zosSvrC + "/zos/comments/upward?callback=?&opt=commentsZan&itemId=" + $this.data("vid")
        ,data : {}
        ,type : "GET"
        ,dataType : "text/json"
        ,success : function(resp) {
            $this.removeClass("loading");
            if (resp.code === "0000") {
                $("a[data-vid='" + $this.data("vid") + "']").each(function() {
                    $(this).removeClass("zanCommentBtn meizan").addClass("zan");
                    var num = $(this).text();
                    $(this).text(parseInt(num) + 1);
                });
            } else {
                alert(resp.msg);
                console.error(resp.msg);
            }
        }
        ,error:function(err) {
            $this.removeClass("loading");
            console.error(err);
        }
    });
});

/**
 * 初始化评论列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function initComments(data,containers) {
	containers = containers;
	itemId = data;
	calcRightSideWidth();
	loadMoreComments({"itemId":itemId});
}


function calcRightSideWidth() {
	// 屏幕宽度
    var clientWidth = document.documentElement.clientWidth;
	var fontSize = parseFloat($("#commentdiv").css("font-size"));
	rightSideWidth = clientWidth - 2.7 * fontSize - 2;// 头像边框两个像素
}
/**
 * 加载更多
 */
$("body").delegate(".more-btn",config.CLICK, function(){
	$("#load-more-pub").addClass("loading-after");
	currentPage = currentPage+1;
	loadMoreComments({"itemId":itemId,"pageNum":currentPage});
});
/**
 * 加载全部回复
 */
$("body").delegate(".all-replay-btn",config.CLICK, function(){
	var $this = $(this);
	$this.addClass("loading-after");
	console.log($this.data("id"));
	loadAllreply($this.data("id"),$this);
});
/**
 * 加载数据
 * @param data
 * @param containers
 */
function loadMoreComments(data) {
	data.subPageSize =4;
	$.ajaxp({
        url : config.zosSvrC + "/zos/comments/gets?callback=?" 
        ,data :data
        ,type : "GET"
        ,dataType : "text/json"
        ,success : function(resp) {
        	if(resp.code=="0000"){
        		var htmlString ="";
        		if (currentPage==1) {

        			htmlString += "<ul>";
        		}
       //  		for(var i=0;i<resp.data.list.length;i++){
       //  			var item = resp.data.list[i];
       //  			htmlString +='<li id="'+item.ID+'" class="comment">';
       //  			if(!item.PHOTO){
       //  				item.PHOTO = "images-ext/default-photo.png";
       //  			}
       //  			htmlString +='<div class="userphoto"><span class="photo"><img src="'+item.PHOTO+'"></span></div>';
       //  			htmlString +='<div class="commentinfo">';
       //  			htmlString +='<div class="name">'+item.CUST_NAME+'</div>';
       //  			htmlString +='<div class="time">'+getDataBYtime(item.SUBMIT_DATETIME)+'</div>';
       //  			htmlString +='<div class="commentContent subactionbtn commentPa" data-id='+item.ID+'>'+item.CONTENT+'</div>';
       //  			htmlString +='</div><div class="zanbtn"><a class="fav meizan zanCommentBtn" data-vid="'+item.ID+'">'+item.UPWARD_CNT+'</a></div>';
       //  			if(item.subComments.list.length>0){
       //  				htmlString +='<div class="other-list clear" ><ul>';
       //  				$.each(item.subComments.list,function(n,value) {
							// if(n >2) return false;
       //  					htmlString +='<li id="'+value.ID+'"  data-parentliid="'+item.ID+'"><div>';
       //      				htmlString +=formatName(value.CUST_NAME)+'<span class="time">'+getDataBYtime(value.SUBMIT_DATETIME)+'</span>';
       //      				htmlString +='</div><div><div class="commentContent subactionbtn commentSub" data-id='+value.ID+'>'+value.CONTENT+'</div></div></li>';
       //  		        });
       //  				htmlString +='</ul>';
       //  				if(item.subComments.total > 3){
							// htmlString += '<div  class="load-all-replay all-replay-btn" data-id="'+item.ID+'">查看全部<span class="subTotal">'+item.subComments.total+'</span>条回复</div>';
       //  				}
       //  				htmlString +='</div>';
       //  			}
       //  			htmlString +='</li>';
       //  		}
       		resp.data.rightSideWidth = rightSideWidth;
            htmlString += tpl_comments(resp.data);
        		if(currentPage==1){
        			htmlString += "</ul>";
        			$("#"+containers).append(htmlString);
        			if(parseInt(resp.data.pages)>parseInt(currentPage)){
        				$("#"+containers).append('<div class="load-more-pub more-btn" id="load-more-pub">查看更多</div>');
        			}else{
						if(resp.data.total<1){
							$("#"+containers).append('<div class="load-more-pub not-more zeroData" id="load-more-pub">快来抢沙发吧~</div>');
						}
						else{
							$("#"+containers).append('<div class="load-more-pub not-more" id="load-more-pub">已加载全部</div>');
						}

        			}
        		}else{
        			$("#load-more-pub").removeClass("loading-after");
        			$("#load-more-pub").prev().append(htmlString);
        			if(parseInt(resp.data.pages)==parseInt(currentPage)){
        				$("#load-more-pub").removeClass("more-btn").addClass("not-more").html("已加载全部");
        			}
        		}
        		renderApproveList(resp.data);
        	}else{
        		alert("服务正忙，请稍后再试！");
        	}

			hideZan.init();
        }
        ,error:function(err) {
        	console.error(err);
        }
    });
}
/**
 * 当前所有回复
 * @param data
 * @param containers
 */
function loadAllreply(id,con) {
	
	$.ajaxp({
        url : config.zosSvrC + "/zos/comments/gets?callback=?"
        ,data : {"itemId":itemId,"parentId":id,pageSize:100,"drction":"asc"}
        ,type : "GET"
        ,dataType : "text/json"
        ,success : function(resp) {
        	var htmlString = "";
        	$.each(resp.data.list,function(n,value) {
				htmlString +='<li id="'+value.ID+'"  data-parentliid="'+id+'"><div>';
				htmlString +=formatName(value.CUST_NAME)+'<span class="time">'+getDataBYtime(value.SUBMIT_DATETIME)+'</span>';
				htmlString +='</div><div><div class="commentContent subactionbtn commentSub" data-id='+value.ID+'>'+value.CONTENT+'</div></div></li>';
	        });
        	con.prev().html(htmlString);
        	con.remove();
        }
        ,error:function(err) {
            console.error(err);
        }
    });
}

/**
 * 获取是否已赞请求
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function renderApproveList(data) {
    console.info("renderApproveList");
    var vpIds = "";
    $.each(data.list, function(n, value) { 
        vpIds = vpIds + value.ID + ",";
    });
    if (vpIds == "") return;
    vpIds = vpIds.substring(0, vpIds.length - 1);
    // 查询赞的列表
    $.ajaxp({
        url : config.zosSvrC + "/zos/view/getApproveList?callback=?&opt=commentsZan&vpIds=" + vpIds,
        data : {}
        ,type : "GET"
        ,dataType : "text/json"
        ,success : function(resp) {
            if (resp.code === "0000") {
                $.each(resp.data, function(n, value) {
                    if (value.IS_ZAN == "1") {
                        $("a[data-vid='" + value.VP_ID + "']").each(function() {
                            $(this).removeClass("zanCommentBtn meizan").addClass("zan");
                        }); 
                    }
                });
             } else {
            	 console.error(resp.msg);
             }
        }
    });
}
/**
 * 变换时间
 * @param time
 * @returns {String}
 */
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
	//console.log(currentdate);
	
	
	
	
	if(currentdate==time.substring(0,10)){
		return "今天 "+sf;
	}else{
		return time.substring(5,10)+" "+sf;
	}
}

/*$("body").delegate(".actionbtn", config.CLICK, function(){
	//console.log("1:"+commentFoot.hideCommentTimeOut.timeOutO);
*//*	if(commentFoot.hideCommentTimeOut.timeOutO){
		//console.log("2:"+commentFoot.hideCommentTimeOut.timeOutO);
		clearTimeout(commentFoot.hideCommentTimeOut.timeOutO);
	}*//*
	//客户端，回复评论操作
	var $this = $(this);
	//初始化评论框等
	var thisLi =$("#"+$this.data("id"));
	var pName =  thisLi.children().children(".name").text();
	var index = pName.indexOf("回复");
	if(index > -1){
		pName = pName.substring(0,index);
	}
	var parentId =  thisLi.attr("id");
	var sendElement  =  $(".page > header .send");
	sendElement.data("flag","1");
	sendElement.data("parentId",parentId);
	sendElement.data("pName",pName);

	var pText =  $(".commentFoot .open .text");

	var oldText = thisLi.data("oldText");
	if(oldText){
		pText.val(oldText);
	}else{
		pText.val("");
		pText.attr("placeholder","回复"+pName+":");
	}

	commentFoot.openComment();
});*/
//回复点击事件
$("body").delegate(".subactionbtn", config.CLICK, function(e){
	//console.log("11:"+commentFoot.hideCommentTimeOut.timeOutO);
/*	if(commentFoot.hideCommentTimeOut.timeOutO){
		//console.log("12:"+commentFoot.hideCommentTimeOut.timeOutO);
		clearTimeout(commentFoot.hideCommentTimeOut.timeOutO);
	}*/

	if(e.target.tagName.toLowerCase() === "a" && e.target.className.indexOf("anchor") >= 0) return;

	//客户端，回复评论操作
	var $this = $(this);
	//初始化评论框等
	var thisLi =$("#"+$this.data("id"));
	var pName =  thisLi.children().children(".name").text();
	pName = $.trim(pName);
	var index = pName.indexOf("回复");
	if(index > -1){
		pName = pName.substring(0,index);
	}
	var parentId =  thisLi.attr("id");
	var sendElement = $(".page > header .send");
	sendElement.data("flag","1");
	sendElement.data("parentId",parentId);
	//判断是对评论的回复还是对回复的回复
	var tempFlag = $this.hasClass("commentPa");
	if(tempFlag){
		//对评论的回复
		sendElement.data("pName","");
	}else{
		//对回复的回复
		sendElement.data("pName",pName);
	}


	var pText =  $(".commentFoot .open .text");

	var oldText = thisLi.data("oldText");
	if(oldText){
		pText.val(oldText);
	}else{
		pText.val("");
		pText.attr("placeholder","回复"+pName+":");
	}

	commentFoot.openComment();
});
/**
 * 动态追加评论/回复
 * @param item:数据对象
 * @param id：回复的id（可传）
 */
function addCommentItem(item,id){
	//判断评论是否从0条开始添加
	var temp = commentZeroData();
	if(temp){
		temp.text("已加载全部");
	}
	var htmlString = "";
	if(id){//回复
    htmlString = tpl_comment_reply(item);
		// htmlString +='<li id="'+item.ID+'" data-parentliid="'+item.parentliid+'" ><div>';
		// htmlString +='<span class="name">'+formatName(item.CUST_NAME)+'</span>&nbsp;&nbsp;&nbsp;<span class="time">'+getDataBYtime(item.SUBMIT_DATETIME)+'</span>';
		// htmlString +='</div><div><div class="commentContent subactionbtn commentSub" data-id='+item.ID+'>'+item.CONTENT+'</div></div></li>';
		if($("#"+id).find(".other-list").length > 0){
			$("#"+id).find(".other-list > ul").append(htmlString);
		}else{
			$("#"+id).find(".commentinfo").append('<div class="other-list clear"><ul></ul></div>');
			$("#"+id).find('.commentinfo > div > ul').append(htmlString);
		}
		//对评论下的自评论总数加1
		var subTotal = $("#"+id).find(" .other-list .load-all-replay .subTotal");
		if(subTotal.length >0){
			var count = $.trim(subTotal.text());
			count = parseInt(count);
			if(isNaN(count)) {
				console.log(count);
				count = 0;
			}
			subTotal.text(count +1);
		}
	}else{//评论
		// htmlString +='<li id="'+item.ID+'" class="comment">';
		// if(!item.PHOTO){
		// 	item.PHOTO = "images-ext/default-photo.png";
		// }
		// htmlString +='<div class="userphoto"><span class="photo"><img src="'+item.PHOTO+'"></span></div>';
		// htmlString +='<div class="commentinfo">';
		// htmlString +='<div class="name">'+item.CUST_NAME+'</div>';
		// htmlString +='<div class="time">'+getDataBYtime(item.SUBMIT_DATETIME)+'</div>';
		// htmlString +='<div class="commentContent subactionbtn commentPa" data-id='+item.ID+'>'+item.CONTENT+'</div>';
		// htmlString +='</div><div class="zanbtn"><a class="fav meizan zanCommentBtn" data-vid="'+item.ID+'">'+item.UPWARD_CNT+'</a></div>';
		// htmlString +='</li>';
		item.rightSideWidth = rightSideWidth;
    htmlString = tpl_comment_stdl(item); 
		if($("#"+containers).children("ul").length >0){
			$("#"+containers + " > ul").prepend(htmlString);
		}else{
			$("#"+containers).append("<ul>"+htmlString+"</ul>");
		}
	}
	//对总条数加1操作
	var commentNum = $("#commentNum");
	var count = $.trim(commentNum.text());
	count = parseInt(count);
	if(isNaN(count)) {
		console.log(count);
		count = 0;
	}
	commentNum.text(count+1);

	hideZan.init();
}

function formatName(name){
	var span ="";
	var arg = name.split("回复");
	if(arg.length >1){

		span = "<span class='name'><span class='bf'>"+arg[0]+"</span>回复<span class='af'>"+arg[1]+"</span></span>&nbsp;&nbsp;&nbsp;";

	}else{
		span = "<span class='name'>"+arg[0]+"</span>&nbsp;&nbsp;&nbsp;";
	}

	return span;

}
//判断评论是否是0,0去掉“快点抢沙发吧”
 function commentZeroData(){
	var o =  $("#commentdiv .load-more-pub").filter(".zeroData");
	 if(o.length >0) {
		 return o;
	 } else{
		 return null;
	 }
 }
module.exports.initComments = initComments;
module.exports.renderApproveList = renderApproveList;
module.exports.addCommentItem = addCommentItem;