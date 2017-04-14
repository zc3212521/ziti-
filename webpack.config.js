
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "myShop":"./src/myShop/myShop.js"
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