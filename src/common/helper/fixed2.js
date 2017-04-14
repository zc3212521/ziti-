/**
 * Created by lee on 16-3-16.
 */

/**
 * Created by lee on 16-3-14.
 */

module.exports = function(val){
        if(!val){
           val = "";
        }
        val = val+"";
        var index = val.indexOf(".");
        if(index>0){
            val = val.substr(0,index+3);
        }

        return val;
};