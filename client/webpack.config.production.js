require('dotenv').config();

const path = require('path'),
    webpack = require('webpack'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    StringReplacePlugin = require('string-replace-webpack-plugin')


module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        app: [
            'babel-polyfill',
            './src/index'
        ],
    },
    output: {
        path: path.join(__dirname, "../static/client"),
        publicPath: "/",
        filename: "assets/[name].js",
        chunkFilename: "assets/[name].[chunkhash].js"
    },
    devtool: "cheap-module-source-map",
    module: {
        loaders: [{
            test: /(\.js|\.jsx)$/,
            include: path.join(__dirname, 'src'),
            loader: 'babel-loader',
            query: {
                "presets": [
                    ["es2015", {
                        modules: false
                    }], "stage-0", "react"
                ],
                "plugins": ['transform-async-to-generator', 'transform-decorators-legacy']
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
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            // {
            //     test: /(\.js|\.jsx)$/,
            //     loader: StringReplacePlugin.replace({
            //         replacements: [{
            //             pattern: /SS_BASE_URL/ig,
            //             replacement: function () {
            //                 return process.env.SS_BASE_URL
            //             }
            //         },
            //             {
            //                 pattern: /DIGISIGN_BASE_URL/ig,
            //                 replacement: function () {
            //                     return process.env.DIGISIGN_BASE_URL || 'https://digisign.skyslope.com'
            //                 }
            //             },
            //             {
            //                 pattern: /API_BASE_URL/ig,
            //                 replacement: function () {
            //                     return process.env.API_BASE_URL
            //                 }
            //             },
            //             {
            //                 pattern: /PRIME_API_URL/ig,
            //                 replacement: function () {
            //                     return process.env.PRIME_API_URL
            //                 }
            //             },
            //             {
            //                 pattern: /SS_AUTH_URL/ig,
            //                 replacement: function () {
            //                     return process.env.SS_AUTH_URL
            //                 }
            //             },
            //             {
            //                 pattern: /ANALYTICS_ENABLED/ig,
            //                 replacement: function () {
            //                     return process.env.ANALYTICS_ENABLED || false
            //                 }
            //             }
            //
            //         ]
            //     })
            // }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new StringReplacePlugin(),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            debug: true,
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                },
                context: path.join(__dirname, 'src'),
                output: {
                    path: path.join(__dirname, 'dist')
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("assets/styles.css"),
        // new HtmlWebpackPlugin({
        //     title: 'SKYTC',
        //     hash: false,
        //     inject: true,
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true
        //     },
        //     template: "./index.ejs"
        // }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/)
    ]
};
