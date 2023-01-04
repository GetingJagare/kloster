import path from 'path';
import fs from 'fs';

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import htmlWebpackPlugin from 'html-webpack-plugin';
import {VueLoaderPlugin} from 'vue-loader';
import {htmlDecode} from "./src/js/helper/string.js";

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
const langHtmlPlugins = [];

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
        lang: langName,
        defaultLang: config.defaultLanguage,
        translations: encodeURIComponent(JSON.stringify(langTranslations || {})),
    }, htmlPluginOptions)));
});

export default {
    mode: process.env.NODE_ENV,
    entry: './src/js/app.js',
    output: {
        path: path.resolve(process.env.PWD, 'dist'),
        filename: 'app.js',
        clean: true,
    },
    resolve: {
        alias: {
            vue: '@vue/compat',
            '@js': path.resolve(process.env.PWD, 'src/js'),
            '@scss': path.resolve(process.env.PWD, 'src/scss'),
        },
    },
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)(.*)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        compatConfig: {
                            MODE: 2
                        }
                    }
                },
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
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new htmlWebpackPlugin(Object.assign({}, {
            filename: '../index.html',
            template: './src/html/index.html',
            t: (phrase) => htmlDecode(phrase),
            defaultLang: config.defaultLanguage,
            lang: config.defaultLanguage,
            translations: "{}",
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
