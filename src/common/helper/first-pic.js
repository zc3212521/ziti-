/**
 * Created by lee on 16-3-14.
 */

module.exports = function(val){
	if(val.indexOf(",")>0){
		return val.substring(0,val.indexOf(","));
	}else{
		return val;
	}
	
};