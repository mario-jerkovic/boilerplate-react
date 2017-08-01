const { join } = require('path');
const webpack = require('webpack');

const { paths } = require('../config-manifest.json');

module.exports = {
    context: process.cwd(),
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
            'react-chartjs-2',
            'chart.js',

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

    output: {
        filename: '[name].bundle.js',
        path: join(__dirname, paths.destination, 'js'),
        library: '[name]',
    },

    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: join(__dirname, paths.destination, 'js', '[name].json'),
        }),
    ],
    node: {
        fs: 'empty',
    },
};
