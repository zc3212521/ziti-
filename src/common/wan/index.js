/**
 * Created by lee on 16-3-16.
 */

module.exports = function(val){
    var temp = "0";
    try{
        if(val!=undefined && val){
            val = Number(val+"");
            if(val>=10000){
                temp = val.div(10000).toFixed(2)+"万";
            }else{
                temp = val.toString();
            }
        }
    }catch(err){
        temp = "0";
    }


    return temp;
};