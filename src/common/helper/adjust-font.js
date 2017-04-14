/**
 * Created by lee on 16-3-16.
 */

module.exports = function(str,len,className){
    var defaultClassName = "";
    console.log("adjust-font:",str.length)
    if(str && str.length>len){
        defaultClassName = className;
    }
    return defaultClassName;
};