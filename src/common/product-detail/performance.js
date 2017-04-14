/**
 * 产品业绩表现
 */

var template = require("./performance.tpl");

require("./performance.css");

var emptyNumDisplayStr = "--";

var syl_config = [{
    title:"近一周",
    syl_key:"SYL_1W",
    tlsyl_key:"TLSYL_1W",
    tlpm_key:"TLPM_1W"
}, {
    title:"近一月",
    syl_key:"SYL_1M",
    tlsyl_key:"TLSYL_1M",
    tlpm_key:"TLPM_1M"
}, {
    title:"近三月",
    syl_key:"SYL_3M",
    tlsyl_key:"TLSYL_3M",
    tlpm_key:"TLPM_3M"
}, {
    title:"近六月",
    syl_key:"SYL_6M",
    tlsyl_key:"TLSYL_6M",
    tlpm_key:"TLPM_6M"
}, {
    title:"近一年",
    syl_key:"SYL_1Y",
    tlsyl_key:"TLSYL_1Y",
    tlpm_key:"TLPM_1Y"
}, {
    title:"今年来",
    syl_key:"SYL_YEAR",
    tlsyl_key:"TLSYL_YEAR",
    tlpm_key:"TLPM_YEAR"
}, {
    title:"成立以来",
    syl_key:"SYL_CL",
    tlsyl_key:"TLSYL_CL",
    tlpm_key:"TLPM_CL"
}];

function buildPerformanceDOM(performanceData) {
  var sylDomList = syl_config.map(function(item){
    var data = {};
    data.title = item.title;
    data.syl = formatNum(performanceData[item.syl_key], '--');
    data.tlsy = formatNum(performanceData[item.tlsyl_key], '--');
    data.tlpm = empty(performanceData[item.tlpm_key]);
    if (data.syl == emptyNumDisplayStr && data.tlsy == emptyNumDisplayStr && data.tlpm == '')
        return '';
    if (performanceData[item.syl_key] >= 0) data.syl_color = "red";
    else data.syl_color = "green";
    if (performanceData[item.syl_key] >= 0) data.tlsy_color = "red";
    else data.tlsy_color = "green";
    return template(data);
  });
  // console.info("生成的业绩表现html:" + sylDomList.join(""));
  return sylDomList;
}

function formatNum(num, def) {
    if (!def) {
        def = emptyNumDisplayStr;
    }
    if(typeof num === 'string') num=Math.floor(num);
    return num == undefined ? def : num.toFixed(2) + "%";
}

function empty(str){
    return typeof str === "undefined"?"":(str||"")
}

module.exports = buildPerformanceDOM;