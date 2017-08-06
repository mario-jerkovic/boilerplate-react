const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlushCSSChunksWebpackPlugin = require('flush-css-chunks-webpack-plugin');

module.exports = (env, { sourcePath }) => ({
    context: process.cwd(),
    target: 'web',
    entry: [
        'babel-polyfill',
        join(sourcePath, 'index.js'),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    sourcePath,
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
            template: join(sourcePath, 'index.html'),
        }),
        new FlushCSSChunksWebpackPlugin({
            entryOnly: env === 'production',
        }),
    ],
});
