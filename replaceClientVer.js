/**
 * Created by fengfeng on 16/12/1.
 */
'use strict'
var gutil = require('gulp-util')
var through2 = require('through2');//pipe中获取当前处理的file名字
var replace = require('gulp-replace');//对gulp.src的输入文件，过滤没个文件中符合要求的一部分作为下级的输入
var mergeStream = require('merge-stream');//合并多个gulp.src子任务，用于将多个src子任务全部完成再返回，以保证整个task是同步的

var defaults = {

}

function replaceClientVer() {
	var thisFileName = null;
	var stream1 = through2.obj(function(file,enc,cb){
		console.log(file.relative);//文件名 如square.html
		// console.log(file.path);
		this.push(file);
		thisFileName = file.relative;
		cb();
		console.log("666666"+thisFileName);
	});
	stream1.resume();
	var stream2 =replace(/data-clientver=(\S*)>/g,'data-clientver='+thisFileName+'/>');
	stream2.resume();

	var r =  mergeStream(stream1, stream2);
	return stream2;
	// var thisFileName = null;
	//     var stream = through2.obj(function(file,enc,cb){
	//         console.log(file.relative);//文件名 如square.html
	//         // console.log(file.path);
	//         this.push(file);
	//         thisFileName = file.relative;
	//         cb();
	//         console.log("666666"+thisFileName);
	//     });
	// console.log('========'+thisFileName);
	//     stream.resume();
	//     stream = replace(/data-clientver=(\S*)>/g,'data-clientver='+thisFileName+'/>');
	//     stream.resume();
	//     return stream;
}

module.exports = replaceClientVer;