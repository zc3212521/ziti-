
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "square":"./src/square/square.js"
        ,"person": "./src/person/person.js"
        ,"person-khqrcode": "./src/person-khqrcode/person-khqrcode.js"
        ,"person-wdqrcode": "./src/person-wdqrcode/person-wdqrcode.js"
        ,"shop": "./src/shop/shop.js"
        ,"index-weidian": "./src/index-weidian/index-weidian.js"
        ,"product-tuijian": "./src/product-tuijian/product-tuijian.js"
        ,"follow": "./src/follow/follow.js"
        ,"product-licai-dingqiLicaiDetail":"./src/product-licai-dingqiLicaiDetail/product-licai-dingqiLicaiDetail.js"
        ,"product-licai-noHuobiJijinDetail":"./src/product-licai-noHuobiJijinDetail/product-licai-noHuobiJijinDetail.js"
        ,"product-licai-huobiJijinDetail":"./src/product-licai-huobiJijinDetail/product-licai-huobiJijinDetail.js"
        ,"quanshangziguan-productnoticedetail":"./src/quanshangziguan-productnoticedetail/quanshangziguan-productnoticedetail.js"
        ,"quanshangziguan-wenjianlxiangguan":"./src/quanshangziguan-wenjianlxiangguan/quanshangziguan-wenjianlxiangguan.js"
        ,"noexists":"./src/noexists/noexists.js"
        ,"weixin-erweima":"./src/weixin-erweima/weixin-erweima.js"
        ,"viewpoint-detail":"./src/vp-detail/viewpoint-detail.js"
        ,"viewpoint-detail-audio":"./src/vp-detail-audio/viewpoint-detail-audio.js"
        ,"viewpoint-detail-video":"./src/vp-detail-video/viewpoint-detail-video.js"
        ,"pub-all":"./src/pub-all/pub-all.js"
        ,"branch-shop":"./src/branch-shop/branch-shop.js"
        ,"search":"./src/search/search.js"
        ,"shopold":"./src/shopold/shopold.js"
        ,"publish-viewlist":"./src/publish-viewlist/publish-viewlist.js"
        ,"activity":"./src/activity/activity.js"
        ,"lottery-index":"./src/activity/lottery-index.js"
        ,"lottery-his":"./src/activity/lottery-his.js"
        ,"lottery-share":"./src/activity/lottery-share.js"
        ,"chatroom":"./src/chatroom/chatroom.js"
        ,"editor":"./src/editor/editor.js"
        ,"chatroom-list":"./src/chatroom-list/chatroom-list.js"
    },
    output: {
        path: path.join(__dirname, "./debug"),
        releasePath: path.join(__dirname, "./release"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",
        publicPath: ""
    },
    resolve: {
        alias: {
            common: path.join(__dirname, "./src/common")
        },
        root: [
            path.resolve('./node_modules')
        ],
        extensions: ['', '.js',".tpl"]
    },
    module: {
        loaders: [ //[chunkhash:8].[name].[ext]
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=assets/[name].[hash:8].hash_wp.[ext]'},
            { test: /\.tpl$/, loader: "handlebars-loader",query: {
                helperDirs: [path.join(__dirname, "./src/common/helper")]
            }},
            //{test: /\.html$/,loader: "html?name=[name].[ext]" },
            {test: /\.(woff|woff2|eot|svg|ttf)/,   loader: "url-loader?limit=10000&minetype=application/font-woff&name=assets/[name].[hash:8].hash_wp.[ext]" }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",
            minChunks: 16
        }),

        new ExtractTextPlugin("[name].css")
    ]
    ,devtool: 'inline-source-map'
    ,node: {
        fs: 'empty'
    }

};