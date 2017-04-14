/**
 * Created by lee on 16-3-14.
 */

module.exports = function(val){
  if (!val) {
    return "";
  }
  if (val.length == 11) {
    return formatDate1(val);
  } else if (val.length == 19) {
    return formatDate2(val);
  } else {
    console.warn("没有预料的日期格式：" + val);
    return val;
  }
  
};

/**
 * 处理日期格式为 "MM-dd hh:mm" 的字符串
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
function formatDate1(val) {
  var myDate = new Date();
  var datay = myDate.getMonth() + 1;
  datay = datay < 10 ? "0" + datay : datay;
  datay = datay + "-" + (myDate.getDate()<10 ? "0" +  myDate.getDate() :  myDate.getDate());
  var targetday_milliseconds = myDate.getTime() - 1000 * 60 * 60 * 24 * 1;          
  myDate.setTime(targetday_milliseconds);
  var datay2 = myDate.getMonth() + 1;
  datay2 = datay2 < 10 ? "0" + datay2 : datay2;
  datay2 = datay2+"-"+(myDate.getDate()<10 ? "0" +  myDate.getDate() :  myDate.getDate());
  var yy = val.substring(0,5);
  if(yy==datay){
   // console.info(11);
    return "今天"+" "+val.substring(6);
  }else if(yy==datay2){
    return "昨天"+" "+val.substring(6);
  }else{
    return val;
  }
}

/**
 * 处理日期格式为 "yyyy-MM-dd hh:mm:ss" 的字符串
 * @param  {[type]} time [description]
 * @return {[type]}     [description]
 */
function formatDate2(time) {
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