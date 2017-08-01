const { join } = require('path');
const webpack = require('webpack');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.base = (env) => {
    if (env === 'production') {
        return {
            devtool: 'source-map',
            plugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    filename: 'js/[name].bundle.js',
                    minChunks({ context }) {
                        return context && context.indexOf('node_modules') >= 0;
                    },
                }),
            ],
        };
    }

    return {
        entry: {
            app: [
                'react-hot-loader/patch',
            ],
        },
        devtool: 'cheap-eval-source-map',
        plugins: [
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

                        /**
                         * Webpack development runtime dependencies
                         * @TODO extract it into separate [xx].bundle.js
                         */
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

exports.devServer = ({ host, port, paths: { source, destination } }) => ({
    devServer: {
        host,
        port,
        hot: true,
        inline: true,
        historyApiFallback: true,
        contentBase: destination,
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: join(source, 'index.html'),
            mobile: true,
        }),
    ],
});

exports.lintJS = ({ path, options }) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path,
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

exports.SCSS = (env) => {
    const styleLoaders = [
        {
            loader: 'css-loader',
            options: {
                modules: true,
                sourceMap: true,
                camelCase: true,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]___[hash:base64:5]',
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
            options: {
                sourceMap: true,
            },
        },
    ];

    if (env === 'production') {
        return {
            module: {
                rules: [
                    {
                        test: /\.scss/,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: styleLoaders,
                        }),
                    },
                ],
            },
            plugins: [
                new ExtractTextPlugin({
                    filename: 'css/style-[name].css',
                    allChunks: true,
                }),
            ],
        };
    }

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        ...styleLoaders,
                    ],
                },
            ],
        },
    };
};
