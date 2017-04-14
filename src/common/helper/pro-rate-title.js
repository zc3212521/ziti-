/**
 * Created by lee on 16-3-14.
 */

function getSylTitle(bean) {
    var clrq = bean.CLRQ;
    var title = "近一年收益率";
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
            title = "近六月收益率";
        } else if (before_3m > dateClrq) {
            // 3个月上 近三月收益
            title = "近三月收益率";
        } else if (before_1m > dateClrq) {
            // 1个月上 近一月收益
            title = "近一月收益率";
        } else {
            // 1个月内 最新净值
            title = "最新净值";
        }
    }
    return title;
}

module.exports = function(){
    var rate = "";

    if(this.XQZSFS == 1){//非货币基金
        rate = getSylTitle(this);
    }
    if(this.XQZSFS == 2){//货币基金
        rate = "七日年化收益率";
    }
    if(this.XQZSFS == 3){//银行理财
        rate = "往期年化收益率";
    }
    return rate;
};