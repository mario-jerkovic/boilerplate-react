const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlushCSSChunksWebpackPlugin = require('flush-css-chunks-webpack-plugin');

const Config = require('./config');

const { paths } = Config;

module.exports = {
    context: process.cwd(),
    target: 'web',
    entry: [
        'babel-polyfill',
        join(paths.source, 'index.js'),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    paths.source,
                ],
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            fetch: 'exports-loader?self.fetch!whatwg-fetch',
        }),
        new HtmlWebpackPlugin({
            title: 'Boilerplate react',
            template: join(paths.source, 'index.html'),
        }),
        new FlushCSSChunksWebpackPlugin({
            entryOnly: Config.env === 'production',
        }),
    ],
};
