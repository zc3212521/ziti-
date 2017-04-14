//需要配置的项
var level = "release"; // "debug"  or  "release"  定义调试模式还是生产模式  内置server分别加载debug目录或release目录
var htmlFixedNameFiles = [
    'debug/**/*.html'
    // 'debug/square.html',
    // 'debug/product-licai-dingqiLicaiDetail.html',
    // 'debug/product-licai-huobiJijinDetail.html',
    // 'debug/product-licai-noHuobiJijinDetail.html',
    // 'debug/vp-detail.html',
    // 'debug/vp-detail-audio.html',
    // 'debug/vp-detail-video.html',
    // 'debug/shop.html',
    // 'debug/404.html',
    // 'debug/noexists.html'

]; //可以加其他需要固定名称的页面(统一是debug下，releae会自动处理) 如 'debug/square.html','debug/manage.html'
var htmlDebugOutFiles = ['debug/**/*.html','debug/**/*.tpl'
    // ,'!debug/square.html',
    // '!debug/product-licai-dingqiLicaiDetail.html',
    // '!debug/product-licai-huobiJijinDetail.html',
    // '!debug/product-licai-noHuobiJijinDetail.html',
    // '!debug/vp-detail.html',
    // '!debug/vp-detail-audio.html',
    // '!debug/vp-detail-video.html',
    // '!debug/shop.html',
    // '!debug/404.html',
    // '!debug/noexists.html'

]; //可以加其他需要固定名称的页面(排除）(统一是debug下，releae会自动处理) 如'!debug/square.html','!debug/manage.html'
var md5 = true;

//以下无需改动
var gulp = require("gulp");//四个api task src dest  watch ,三种保证同步的机制：1）return流（多个流子任务通过merge-stream插件合并） 2）promise  3）callback
var gutil = require("gulp-util");//这里主要用log输出
var webpack = require("webpack");//进行webpack集成 调用webpack进行中间编译
var WebpackDevServer = require("webpack-dev-server");//启动内置server
var webpackConfig = require("./webpack.config.js");//webpack配置文件
var clean = require('gulp-clean');//clean debug和release文件夹
var mergeStream = require('merge-stream');//合并多个gulp.src子任务，用于将多个src子任务全部完成再返回，以保证整个task是同步的
var revReplace = require('gulp-rev-replace');//Html中替换css文件名，revCollector不能替换html中的css名（可能bug），用revReplace补一下
var contentInclude = require('gulp-content-includer');//修改htmlFixName/rev-manifest.json的内容，在json前加jsonp的固定callback
var rename = require("gulp-rename");//将当前处理的文件名重命名
var through = require('through2');//pipe中获取当前处理的file名字
var boolCall = require('./boolCall.js');//自定义插件，根据条件bool值执行特定任务



var minifyHTML   = require('gulp-minify-html'),//压缩html
    rev = require('gulp-rev'),//进行md5名字改名
    gulpRevFormat = require('gulp-rev-format'),//定义md5名字的格式
    revCollector = require('gulp-rev-collector'),//替换md5的引用
    minifyJs= require('gulp-uglify'),//压缩js
    minifyCss = require('gulp-minify-css');//压缩css

var replace = require('gulp-replace');//对gulp.src的输入文件，过滤没个文件中符合要求的一部分作为下级的输入
var fs = require('fs');

function getNowFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = ''+ date.getFullYear()  + month  + strDate + date.getHours()  + date.getMinutes() + date.getSeconds();
    return currentdate;
}
// var prefix = '--'+getNowFormatDate()+'-';
var prefix = '--@@';
var suffix = '@@--';

var revFormat = function(){
    return gulpRevFormat({
        prefix: prefix, // 在版本号前增加字符
        suffix: suffix, // 在版本号后增加字符
        lastExt: false
    });
};


var cssDebugOutFiles = [
    'debug/**/*.css'
];
var jsDebugOutFiles = [
    'debug/**/*.js'
];
var imgDebugOutFiles = [
    'debug/**/*.png','debug/**/*.jpg','debug/**/*.gif','!debug/assets/**/*hash_wp*','!debug/images/**/*hash_wp*','!debug/images-ext/**'
];




var bStartServer = false;//因为server一直运行 所以整个gulp一直运行 该变量一直有效
gulp.task("clean", function(){
    if(bStartServer==false){
        bStartServer = true;
        gutil.log("clean debug and release start...");
        var r1 = gulp.src('debug',{read:false}).pipe(clean());
        var r2 = gulp.src('release',{read:false}).pipe(clean());
        return mergeStream(r1,r2);
    }
});


gulp.task("debug:copy-files",["clean"],function(){
    var r1 = gulp.src(['src/**/*.html','!src/videoPlayer/**/*.html'])
        .pipe(through.obj(function(file,enc,cb){
                // console.log(file.relative);//文件名 如square.html
                // console.log(file.path);
                this.push(file);
                var thisFileName = file.relative;
                var fileContent = file.contents.toString();

                var reg=new RegExp("<(.*)body([^>]*)>","i");
                var replaceStr='<$1body$2>' +
                    '<input id="clientPageMd5Name" type="hidden" data-clientver="'+thisFileName+'"/>'+
                    '<script type="text/javascript">//include "../release/checkVersion.template"</script>'
                fileContent=fileContent.replace(reg,replaceStr);


                file.contents = new Buffer(fileContent);
                this.push(file);
                cb();
                console.log("insert html checkVersionJScode： "+thisFileName);
        }))
        .pipe(gulp.dest(webpackConfig.output.path));

    //var r1 = gulp.src(['src/**/*.html','!src/videoPlayer/**/*.html'])
    //          .pipe(gulp.dest(webpackConfig.output.path));

    var r2 = gulp.src(['src/images/**/*.png','src/images/**/*.jpg','src/images/**/*.gif'])
        .pipe(gulp.dest(webpackConfig.output.path+"/images"));

    // var r3 = gulp.src(['src/cordova.js','src/cordova_plugins.js'])
    //     .pipe(gulp.dest(webpackConfig.output.path));
    // var r4 = gulp.src(['src/plugins/**/*.*'])
    //     .pipe(gulp.dest(webpackConfig.output.path+'/plugins'));
    // var r5 = gulp.src(['src/login/**/*.*'])
    //     .pipe(gulp.dest(webpackConfig.output.path+"/login"));

    var r6 = gulp.src(['src/common/assets/**/*.*'])
        .pipe(gulp.dest(webpackConfig.output.path+"/common/assets"));

    var r7 = gulp.src(['src/common/common.css'])
        .pipe(gulp.dest(webpackConfig.output.path+"/common"));

    var r8 = gulp.src(['src/images-ext/**/*.png','src/images-ext/**/*.jpg','src/images-ext/**/*.gif'])
        .pipe(gulp.dest(webpackConfig.output.path+"/images-ext"));

    var r9 = gulp.src('src/checkVersion.template')
        .pipe(minifyJs())
        .pipe(gulp.dest(webpackConfig.output.releasePath));

    var r10 = gulp.src(webpackConfig.output.path+"/videoPlayer",{read:false}).pipe(clean());

    var r11 = gulp.src('src/cache.manifest')
        .pipe(gulp.dest(webpackConfig.output.path))
        .pipe(gulp.dest(webpackConfig.output.releasePath));

    return mergeStream(r1, r2, r6, r7, r8, r9,r10,r11);
});

gulp.task("release:miniAndMd5",["debug:copy-files","debug:webpack:build-dev"], function() {
    if(level=='debug') return;
    gutil.log("release:miniAndMd5 start...");
    var r1 = gulp.src(jsDebugOutFiles)
        .pipe(boolCall(md5,minifyJs()))
        .pipe(rev())
        // .pipe(revFormat())
        .pipe(gulp.dest('release'))  //js 仅md5  不压缩 ，压缩在下一步做
        .pipe(rev.manifest())
        .pipe(gulp.dest('debug/md5Map/js'));

    var r2 = gulp.src(imgDebugOutFiles)
        .pipe(rev())
        // .pipe(revFormat())
        .pipe(gulp.dest('release'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('debug/md5Map/img'));

    //直接copy assets和images下已被webpack处理（可能是js或css已经引用了改图片，webpack自动对其进行了hash:8)的图片到release目录下
    var r3 = gulp.src('debug/assets/**/*hash_wp*')
        .pipe(gulp.dest('release/assets'));
    var r4 = gulp.src('debug/images/**/*hash_wp*')
        .pipe(gulp.dest('release/images'));

    var r5 = gulp.src(cssDebugOutFiles)
        .pipe(boolCall(md5,minifyCss()))
        .pipe(rev())
        // .pipe(revFormat())
        .pipe(gulp.dest('release'))  // 生成 name-md5.css
        .pipe(rev.manifest())
        .pipe(gulp.dest('debug/md5Map/css')); // 生成 rev-manifest.json(映射)

    var r6 = gulp.src(htmlDebugOutFiles)
        .pipe(contentInclude({
            includerReg:/\/\/include\s+"([^"]+)"/g
        }))
        .pipe( boolCall(md5,minifyHTML({
            empty:true,
            spare:true
        })  ) )
        // .pipe(rev())
        .pipe(gulp.dest('release'))  // 生成 name.html


    var r9 = gulp.src('debug/images-ext/**/*')
        .pipe(gulp.dest('release/images-ext'));


    return mergeStream(r1, r2, r3, r4, r5, r6, r9);

});

// var replaceClientVer = require('./replaceClientVer.js');
gulp.task("release:change-html", ['release:miniAndMd5'], function() {
    gutil.log("release:miniAndMd5 javascript end...");gutil.log("release:miniAndMd5 css end...");gutil.log("release:miniAndMd5 image end...");
    if(level=='release'){
        gutil.log("change cordova-plugins start...");
        var r1 = gulp.src(['debug/md5Map/js/rev-manifest.json']) //['debug/md5Map/js/rev-manifest.json', 'release/cordova*.js']
            .pipe(revCollector({
                replaceReved: true}))
            .pipe(gulp.dest('release'));
        // var r2 = gulp.src(['debug/md5Map/js/rev-manifest.json', 'release/plugin/**/*.js'])
        //     .pipe(revCollector({
        //         replaceReved: true}))
        //     .pipe(gulp.dest('release'));

        gutil.log("change js beacuse it oprate images start...");
        var r3 = gulp.src(['debug/md5Map/img/rev-manifest.json', 'release/**/*.js'])
            .pipe(revCollector({
                replaceReved: true}))
            .pipe(gulp.dest('release'));

        gutil.log("change html start...");

        //Html中替换css文件名，revCollector不能替换html中的css名（可能bug），用revReplace补一下
        var manifest = gulp.src(['debug/md5Map/css/*.json','debug/md5Map/img/*.json','debug/md5Map/js/*.json']);
        var r5 =gulp.src('release/*.html')
            .pipe(revReplace({manifest: manifest}))
            // .pipe(through.obj(function(file,enc,callback){
            //     // console.log(file.relative);//文件名 如square.html
            //     // console.log(file.path);
            //     this.push(file);
            //     callback(file.relative);
            // }))

            // .pipe(function(){
            //     var thisFileName = null;
            //     var stream = through.obj(function(file,enc,cb){
            //         // console.log(file.relative);//文件名 如square.html
            //         // console.log(file.path);
            //         this.push(file);
            //         thisFileName = file.relative;
            //         cb();
            //         console.log("666666"+thisFileName);
            //     });
            //     // stream.resume();
            //     // stream = replace(/data-clientver=(\S*)>/g,'data-clientver='+thisFileName+'/>');
            //     // stream.resume();
            //     return stream;
            // })
            // .pipe(replaceClientVer())
            .pipe(gulp.dest("release"));

        var r6 = gulp.src('src/videoPlayer/**/*')
            .pipe(gulp.dest(webpackConfig.output.releasePath+"/videoPlayer"));
        var r6_2 = gulp.src('src/videoPlayer/**/*')
            .pipe(gulp.dest(webpackConfig.output.path+"/videoPlayer"));

        return mergeStream(r1,r3,r5,r6,r6_2);
    }else{
        var r1 = gulp.src('src/videoPlayer/**/*')
            .pipe(gulp.dest(webpackConfig.output.path+"/videoPlayer"));
        return mergeStream(r1);
    }

});

gulp.task("release:genHtmlMd5Maninfest", ["release:change-html"],function(){
    gutil.log("release:genHtmlMd5Maninfest.......");
    if(level=='release') {
        var r1 = gulp.src('release/*.html')
            .pipe(rev())
            .pipe(gulpRevFormat({
                prefix: '--', // 在版本号前增加字符
                suffix: '', // 在版本号后增加字符
                lastExt: false
            }))
            .pipe(rev.manifest())
            .pipe(gulp.dest('debug/md5Map/htmlFixName')); // 生成 rev-manifest.json(映射)

        var r2 = gulp.src('release/*.html')
            .pipe(rev())
            .pipe(gulpRevFormat({
                prefix: '--@@', // 在版本号前增加字符
                suffix: '@@--', // 在版本号后增加字符
                lastExt: false
            }))
            .pipe(rev.manifest())
            .pipe(gulp.dest('debug/md5Map/tmpHtmlMap')); // 生成 rev-manifest.json(映射)
        return mergeStream(r1,r2);
    }
});

gulp.task("release:writeClientVerIntoHtml",["release:genHtmlMd5Maninfest"], function(){
    gutil.log("change cordova-plugins end...");gutil.log("change html end...");
    if(level=='release') {
//        function modifyUnreved(filename) {
//           // filename = "data-clientver="+filename+">";
//          return filename;
//        }
//        function modifyReved(filename) {
//          filename = "data-clientver="+filename+">";
//          return filename;
//        }
//        var manifestFile = fs.readFile('debug/md5Map/htmlFixName/rev-manifest.json', 'utf8');
//        manifestFile = JSON.parse(manifestFile);

//,function(s, filename) {
//                            return manifestFile[filename];
//                      }))
        var tmpHtmlMap = gulp.src(["debug/md5Map/tmpHtmlMap/rev-manifest.json"]);
        var r1 = gulp.src(['release/*.html'])
            .pipe(revReplace({manifest: tmpHtmlMap}))
            .pipe(replace(/data-clientver=(\S*)--@@(\S*)@@--(\S*).html/g,'data-clientver=$1--##$2##--.html'))
            .pipe(replace(/--@@([^@]*)@@--.html/ig,'.html'))
            .pipe(replace(/data-clientver=(\S*)--##(\S*)##--(\S*).html/g,'data-clientver=$1--$2.html'))
            .pipe(gulp.dest(webpackConfig.output.releasePath));

        return mergeStream(r1);
//                      .pipe(replace(/data-clientver=(\S*)>/g,'$1'))


        //JSON.stringify(revReplace({
        //  manifest: manifest
//                                                                             ,modifyUnreved: modifyUnreved
//                                                                             ,modifyReved: modifyReved
        //                                     }))))
    }
});

gulp.task("release:createCheckVersionJsonpFile", ["release:writeClientVerIntoHtml"],function(){
    gutil.log("release:createCheckVersionJsonpFile.......");
    if(level=='release') {
        var r1 = gulp.src('src/htmlFixName.template')
            .pipe(contentInclude({
                includerReg: /<!\-\-include\s+"([^"]+)"-->/g
            }))
            .pipe(rename('checkVersion.jsonp'))
            .pipe(gulp.dest(webpackConfig.output.releasePath + "/htmlFixName"));
        return mergeStream(r1);
    }

});

gulp.task("finishAllTask", ["release:createCheckVersionJsonpFile"],function(){
    gutil.log("release:finishAll.......  success  .......");
    gutil.log("http://localhost:8082/debug/square.html");
});

// The development server (the recommended option for development)
gulp.task("default", ["finishAllTask","alone:webpack-dev-server","alone:watchSrc"],function(){
});








// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("debug:webpack:build-dev", function(callback) {
    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});


gulp.task("alone:webpack-dev-server", function(callback) {//callback故意不返回 让gulp整个程序一直挂起 所以server得以运行
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    //myConfig.devtool = "eval";
    //myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        // contentBase:level=="debug"?myConfig.output.path:myConfig.output.releasePath,
        contentBase:myConfig.output.releasePath+'/../',
        stats: {
            colors: true
        }
    }).listen(8082, "0.0.0.0", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8082");
    });
});

gulp.task("alone:watchSrc", function() {
    gulp.watch(["src/**/*"], ["finishAllTask"]);
});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh




// Production build
//gulp.task("build", ["webpack:build"]);
//
//gulp.task("webpack:build", function(callback) {
//    // modify some webpack config options
//    var myConfig = Object.create(webpackConfig);
//    myConfig.plugins = myConfig.plugins.concat(
//        new webpack.DefinePlugin({
//            "process.env": {
//                // This has effect on the react lib size
//                "NODE_ENV": JSON.stringify("production")
//            }
//        })
//        /**
//        new webpack.optimize.DedupePlugin(),
//        new webpack.optimize.UglifyJsPlugin()
//         **/
//    );
//
//    // run webpack
//    webpack(myConfig, function(err, stats) {
//        if(err) throw new gutil.PluginError("webpack:build", err);
//        gutil.log("[webpack:build]", stats.toString({
//            colors: true
//        }));
//        callback();
//    });
//});





