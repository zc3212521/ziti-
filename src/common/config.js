/**
 * Created by lee on 16-3-3.
 *
 * 项目全局参数配置
 *
 */
var debug = false;
if(debug){
    window.config = {
        "zosSvrC":"https://wd.95538.cn:9090/zosSvrC"
        ,"zosCust":"https://wd.95538.cn:8443/zosCust"
        ,"pageSize":15  //设置单页的数量
        ,"CLICK":"click"//统一所有的点击事件便于click->tap
        ,"resource":"https://wd.95538.cn:9090/"
        , officialShops:["110003", "110004", "110002"]
        ,"liveSvr":"https://wd.95538.cn:14000"
        ,"limitStartTime":"2017/02/08 15:00:00"
        ,"limitSpendTime":2.5*60*60*1000
    };
}else{
    //release
    window.config = {
        "zosSvrC":"https://wd.95538.cn:9080/zosSvrC"
        ,"zosCust":"https://wd.95538.cn/zosCust"
        ,"pageSize":15  //设置单页的数量
        ,"CLICK":"click"//统一所有的点击事件便于click->tap
        ,"resource":"https://wd.95538.cn:9080/"
        , officialShops:["110003", "110007", "110014", "110049"]
        ,"liveSvr":"https://wd.95538.cn:13004"
        ,"limitStartTime":"2017/02/08 15:00:00"
        ,"limitSpendTime":2.5*60*60*1000
    };
}
window.config.isLimited = function(){
    if(!window.config.limitSpendTime){
        return false;
    }else{
        var spend = new Date().getTime() - Date.parse(window.config.limitStartTime);
        return (spend<window.config.limitSpendTime) && (spend>=0);
    }
};
module.exports = window.config;