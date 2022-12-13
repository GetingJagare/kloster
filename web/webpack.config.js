const path = require('path');
const fs = require('fs');

//const cleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV === 'development';

const config = require('./config');

const langPath = path.resolve(__dirname, 'translations');
const htmlPluginOptions = {
    inject: true,
    hash: true,
    minify: devMode ? false : {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        //removeEmptyElements: true,
        removeTagWhitespace: true,
        //ignoreCustomFragments: [/<a[^>]*>.*<\/a>/]
    }
};
let langHtmlPlugins = [];

let htmlDecode = str => {
    return str.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
};

let __t = (phrase) => {
    return htmlDecode(phrase);
};

fs.readdirSync(langPath).forEach(file => {
    let langTranslations = require(langPath + '/' + file);
    let langName = file.match(/^(.+)\..+$/)[1];

    let langDir = __dirname + '/' + langName;

    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, 0755);
    }

    let __t = (phrase) => {
        phrase = htmlDecode(phrase);
        return langTranslations && langTranslations[phrase] ? langTranslations[phrase] : phrase;
    };

    langHtmlPlugins.push(new htmlWebpackPlugin(Object.assign({}, {
        filename: langDir + '/index.html',
        template: './src/html/index.html',
        t: __t,
        lang: langName
    }, htmlPluginOptions)));
});

module.exports = {
    mode: !devMode ? 'production' : 'development',
    entry: ['./src/js/app.js', './src/sass/app.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                ]
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.html$/,
                include: [],
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            }
        ]
    },
    plugins: [
        //new cleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new VueLoaderPlugin(),
        new htmlWebpackPlugin(Object.assign({}, {
            filename: '../index.html',
            template: './src/html/index.html',
            t: __t,
            lang: config.defaultLanguage
        }, htmlPluginOptions))
    ].concat(langHtmlPlugins),
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({test: /\.js$/i})
        ]
    }
};
