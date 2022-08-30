import path from 'path';
import fs from 'fs';

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import htmlWebpackPlugin from 'html-webpack-plugin';
import {VueLoaderPlugin} from 'vue-loader';
import {CleanWebpackPlugin} from "clean-webpack-plugin";

const devMode = process.env.NODE_ENV === 'development';

const config = JSON.parse(fs.readFileSync('./config/index.json'));

const langPath = path.resolve(process.env.PWD, 'translations');
const htmlPluginOptions = {
    inject: 'body',
    hash: true,
    scriptLoading: 'defer',
    minify: devMode ? false : {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
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
    let langTranslations = JSON.parse(fs.readFileSync(langPath + '/' + file));
    let langName = file.match(/^(.+)\..+$/)[1];

    let langDir = process.env.PWD + '/' + langName;

    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, 755);
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

export default {
    mode: process.env.NODE_ENV,
    entry: './src/js/app.js',
    output: {
        path: path.resolve(process.env.PWD, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)(.*)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            emitFile: true,
                            esModule: false,
                        }
                    }
                ],
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
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new htmlWebpackPlugin(Object.assign({}, {
            filename: '../index.html',
            template: './src/html/index.html',
            t: __t,
            lang: config.defaultLanguage
        }, htmlPluginOptions))
    ].concat(langHtmlPlugins),
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
};
