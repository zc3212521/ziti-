/**
 * Created by lee on 16-3-14.
 */

module.exports = function(val,str){
    var s = "";
    if(typeof val != "undefined"){
        if(val){
            s = val+str;
        }
    }
    return s;
};