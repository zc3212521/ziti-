/**
 * Created by lee on 16-3-14.
 */

module.exports = function(){
    var ret = "";
    try{
        if(this.XQZSFS == 1){//基金
            var syl = getSyl(this);
            if ("首发" == syl) {
                return "red";
            }
            var v = parseFloat(slice2(syl));
            if(v>=0){
                ret = "red";
            }else if(v<0){
                ret = "green";
            }
        }

        if(this.XQZSFS == 2){//货币
            var v = parseFloat(slice2(this.QRNH));
            if(v>=0){
                ret = "red";
            }else if(v<0){
                ret = "green";
            }
        }

        if(this.XQZSFS == 3){//银行理财
            var rate = "";
            var i = this.YQSYL.indexOf("%");
            if(i>0){
                rate = this.YQSYL.substr(0,i+1);
                rate = slice2(rate)+"%";
            }else{
                rate = this.YQSYL;
            }

            var v = parseFloat(rate);
            if(v>=0){
                ret = "red";
            }else if(v<0){
                ret = "green";
            }
        }
    }catch (err){
        return ""
    }

    return ret;
};

function slice2(val){
    val = val+"";
    var index = val.indexOf(".");
    if(index>0){
        val = val.substr(0,index+3);
    }

    return val;
}

function getSyl(bean) {
    var clrq = bean.CLRQ;
    var syl = bean.SYL_1Y;
    if (clrq == undefined || clrq == null || clrq == "" || clrq == "0000-00-00" || clrq == "1900-01-01") {
        
    } else {
        var now = new Date();
        var dateClrq = new Date(clrq);
        var before_1y = new Date();
        before_1y.setDate(now.getDate() - 366);
        var before_6m = new Date();
        before_6m.setDate(now.getDate() - 183);
        var before_3m = new Date();
        before_3m.setDate(now.getDate() - 92);
        var before_1m = new Date();
        before_1m.setDate(now.getDate() - 31);

        if (before_1y > dateClrq) {
            // 1年以上 
        } else if (before_6m > dateClrq) {
            // 6个月上 近六月收益
            syl = bean.SYL_6M;
        } else if (before_3m > dateClrq) {
            // 3个月上 近三月收益
            syl = bean.SYL_3M;
        } else if (before_1m > dateClrq) {
            // 1个月上 近一月收益
            syl = bean.SYL_1M;
        } else if (now > dateClrq) {
            // 1个月内 最新净值
            syl = bean.CPJZ;
        } else {
            // 未来成立
            syl = bean.CPJZ;
        }
    }
    return syl;
}