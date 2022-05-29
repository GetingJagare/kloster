import path from 'path';
import fs from 'fs';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {VueLoaderPlugin} from 'vue-loader';
import htmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import config from './config/index.json';
const devMode = process.env.NODE_ENV === 'development';

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
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: 4,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
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
                                quality: '65-90',
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
};
