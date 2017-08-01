const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

exports.base = (env, { path }) => {
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
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require(join(path, 'vendor.json')), // eslint-disable-line global-require, import/no-dynamic-require
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
        new AddAssetHtmlPlugin({
            filepath: join(destination, 'js', 'vendor.bundle.js'),
            includeSourcemap: false,
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
