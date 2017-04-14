/**
 * 基金产品费率
 */
var $ = require("common/zepto");

require("./fund-fee.css");

/**
 * 交易费率
 * @param data
 */
function renderFeeDOM(feiLvList, glf, tgf){
  var currentKind = "";
  $.each(feiLvList, function(i,val){
    var feilv = "";
    if (val.ZSLX == currentKind){
      feilv = "<div class='feilv'><div class='feilv-t'>&nbsp;";
    } else {
      feilv = "<div class='feilv first'><div class='feilv-t'>&nbsp;" + val.ZSLX;
    }
    feilv = feilv + "</div><div class='feilv-l'>";
    var feilvMS = "";
    //判断显示期限、还是显示金额
    if (val.QXXX || val.QXSX) {
      if (!val.QXXX) {
        feilvMS += "T &lt; " + val.QXSX + val.QXDW;
      } else if (!val.QXSX) {
        feilvMS += val.QXXX + val.QXDW + " ≤ T1";
      } else {
        feilvMS += val.QXXX + val.QXDW + " ≤ T &lt; " + val.QXSX + val.QXDW
      }
    }
    
    if (val.JESX || val.JEXX) {
      if (feilvMS != "") {
        feilvMS += "<br>";
      }
      if (!val.JESX) {
        feilvMS += val.JEXX + "万 ≤ M";
      } else if (!val.JEXX) {
        feilvMS += "M &lt; " + val.JESX + "万";
      } else {
        feilvMS += val.JEXX + "万 ≤ M &lt; " + val.JESX + "万";
      }
    }

    if (val.CS) {
      feilvMS += "<span class=''> (" + val.CS + ")</span>";
    }

    // if (val.FL&&val.BCSM) {
    //  if(feilvMS!=""){
    //    feilvMS = feilvMS + "<br>";
    //  }
    //  feilvMS = feilvMS + "<span>"+val.BCSM+"</span>";
    // }
    if (val.BCSM) {
      if (val.FL) {
        if (feilvMS != ""){
          feilvMS = feilvMS + "<br>";
        }
        feilvMS = feilvMS + "<span>"+val.BCSM+"</span>";
      } else {
        var index = val.BCSM.indexOf("/笔");
        if (index > 0 && val.BCSM.length > (index + 3)) {
          if (feilvMS != ""){
              feilvMS = feilvMS + "<br>";
          }
          feilvMS = feilvMS + "<span>"+val.BCSM.substr(index+3)+"</span>";
        } else if (index < 0) {
          if (feilvMS != "") {
              feilvMS = feilvMS + "<br>";
          }
          feilvMS = feilvMS + "<span>" + val.BCSM + "</span>";
        }
      }
    }

    if (feilvMS == "") {
      feilvMS = "--";
    }
    
    feilv = feilv + feilvMS + "&nbsp;</div><div class='feilv-z'>";
    if (val.FL === 0 ) {
      feilv = feilv + "<span class='red'>免手续费</span>";
    } else if (val.FL) {
      feilv = feilv + val.FL + "%";
    } else if (val.BCSM) {
      var index = val.BCSM.indexOf("/笔");
      if (index > 0 && val.BCSM.length > (index + 2)) {
        feilv = feilv + val.BCSM.substr(0, index + 2);
      } else {
        feilv = feilv + val.BCSM;
      }
    } else {
      feilv = feilv + "&nbsp;";
    }
    feilv = feilv +"</div></div>";
    
    $(".feilv-ms").before(feilv);
    currentKind = val.ZSLX;
  });

  var feilv = "<div class='feilv first'><div class='feilv-t'>&nbsp;运作费率</div><div class='feilv-l'>管理费&nbsp;</div><div class='feilv-z'>";
  if (glf === 0 ) {
      feilv = feilv + "<span class='red'>免管理费</span>";
  } else if (glf) {
      feilv = feilv + val.FL + "%";
  } else {
      feilv = feilv + "--";
  }

  feilv = feilv +"</div></div>";
  $(".feilv-ms").before(feilv);
  
  var feilv = "<div class='feilv'><div class='feilv-t'>&nbsp;</div><div class='feilv-l'>托管费&nbsp;</div><div class='feilv-z'>";
  if (tgf === 0 ) {
      feilv = feilv + "<span class='red'>免管理费</span>";
  } else if (tgf) {
      feilv = feilv + tgf + "%";
  } else {
      feilv = feilv + "--";
  }

  feilv = feilv +"</div></div>";
  $(".feilv-ms").before(feilv);
}

module.exports = renderFeeDOM;