require('dotenv').config();
// TODO:  Replace var with import
let path = require("path"),
    webpack = require("webpack"),
    precss = require("precss"),
    autoprefixer = require("autoprefixer"),
    LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        app: [
            'babel-polyfill',
            './src/index'
        ],
    },
    watch: true,

    output: {
        path: path.join(__dirname, "../static/client"),
        publicPath: "/",
        filename: "assets/[name].js",
        chunkFilename: "assets/[name].[chunkhash].js"

    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: [
                        ["es2015", {modules: false}],
                        "stage-0",
                        "react"
                    ],
                    plugins: [
                        "transform-async-to-generator",
                        "transform-decorators-legacy"
                    ]
                }
            },
            {
                test: /\.scss|css$/,
                loader: "style-loader!css-loader!postcss-loader!resolve-url-loader!sass-loader?sourceMap"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            debug: true,
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                },
                context: path.join(__dirname, "src"),
                output: {path: path.join(__dirname, "dist")}
            }
        }),
        new LiveReloadPlugin({})
    ]
};

