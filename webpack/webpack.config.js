const { join } = require('path');
const webpack = require('webpack');
const { paths } = require('../config-manifest.json');

module.exports = {
    context: process.cwd(),
    entry: {
        app: [
            join(__dirname, paths.source, 'index.js'),
        ],
    },
    resolve: {
        alias: {
            'gutgemacht-ui': join(__dirname, paths.source, 'components'),
        },
    },
    output: {
        path: join(__dirname, paths.destination),
        publicPath: '/',
        filename: 'js/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    join(__dirname, paths.source),
                ],
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.ProvidePlugin({
            fetch: 'exports-loader?self.fetch!whatwg-fetch',
        }),
        new webpack.NamedModulesPlugin(),
    ],
};
