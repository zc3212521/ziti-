/**
 * Created by fengfeng on 16/12/1.
 */
'use strict'
var gutil = require('gulp-util')
var through2 = require('through2');//pipe中获取当前处理的file名字

var defaults = {

}

function boolCall(boolExpress,trueCall,falseCall) {
	var stream = through2.obj(function(file,enc,cb){
		this.push(file);
		cb();
	});
	stream.resume();

	if(boolExpress){
		if(trueCall){
			stream = trueCall;
		}
	}else{
		if(falseCall){
			stream = falseCall;
		}
	}
	return stream;
}

module.exports = boolCall;