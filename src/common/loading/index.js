/**
 * Created by lee on 16-3-3.
 */

require("./loading.css");

var loadingCount = 0;

var createBg = function(){
    var element = document.getElementById("loading-bg");
    if(!element){
        element = document.createElement("div");
        element.id = "loading-bg";
        element.className = "loading-bg";
        document.body.appendChild(element);
    }
};

var show = function(mode){
    if(mode){
        createBg();
    }
};

var hide = function(){
    var element = document.getElementById("loading-bg");
    if(element){
        document.body.removeChild(element);
    }
};

module.exports.show = show;
module.exports.hide = hide;
