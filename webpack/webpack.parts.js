const webpack = require('webpack');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const Config = require('./config');

const { paths, devServer } = Config;

exports.base = () => {
    if (Config.env === 'production') {
        return {
            devtool: 'source-map',
            output: {
                path: paths.destination,
                publicPath: devServer.publicPath,
                filename: 'js/[name].[chunkhash].js',
                chunkFilename: 'js/[name].[chunkhash].js',
            },
            plugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    names: ['bootstrap'],
                    filename: 'js/[name].[chunkhash].js',
                    minChunks: Infinity,
                }),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        screw_ie8: true,
                        warnings: false,
                    },
                    mangle: {
                        screw_ie8: true,
                    },
                    output: {
                        screw_ie8: true,
                        comments: false,
                    },
                    sourceMap: true,
                }),
                new webpack.HashedModuleIdsPlugin(),
            ],
        };
    }

    return {
        entry: [
            'react-hot-loader/patch',
        ],
        output: {
            path: paths.destination,
            publicPath: devServer.publicPath,
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
        },
        devtool: 'cheap-eval-source-map',
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['bootstrap'],
                filename: 'js/[name].js',
                minChunks: Infinity,
            }),
            new AutoDllPlugin({
                inject: true,
                debug: true,
                filename: '[name].bundle.js',
                entry: {
                    vendor: [
                        /**
                         * Project vendor/external dependencies
                         * @TODO extract it into separate [xx].bundle.js
                         */
                        'whatwg-fetch',
                        'classnames',
                        'react',
                        'prop-types',
                        'react-dom',
                        'react-hot-loader',
                        'react-hot-loader/patch.js',
                        'react-hot-loader/lib/patch.js',
                        'history',
                        'redux',
                        'react-redux',
                        'react-router-dom',

                        /**
                         * Webpack development runtime dependencies
                         * @TODO extract it into separate [xx].bundle.js
                         */
                        'babel-polyfill',
                        'babel-plugin-universal-import',
                        'lodash',
                        'timers-browserify',
                        'strip-ansi',
                        'url',
                        'sockjs-client',
                        'style-loader',
                        'style-loader/lib/addStyles.js',
                        'css-loader',
                        'react-proxy',
                        'html-entities',
                        'events',
                        'ansi-html',
                    ],
                },
            }),
        ],
    };
};

exports.devServer = () => ({
    devServer: {
        host: devServer.host,
        port: devServer.port,
        disableHostCheck: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        contentBase: paths.destination,
        publicPath: devServer.publicPath,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});

exports.lintJS = (options = {}) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: paths.source,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader',
                        options,
                    },
                ],
            },
        ],
    },
});

exports.SCSS = () => ({
    module: {
        rules: [
            {
                test: /\.scss/,
                use: ExtractCssChunks.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: true,
                                importLoaders: 1,
                                localIdentName: '[[name]__[local]--[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: {
                                    ctx: {
                                        autoprefixer: {},
                                    },
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
        ],
    },
    plugins: [
        new ExtractCssChunks({
            filename: 'css/[name].css',
        }),
    ],
});
