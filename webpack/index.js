const { join } = require('path');
const merge = require('webpack-merge');

const Common = require('./webpack.config');
const Parts = require('./webpack.parts');
const { paths, devServer } = require('../config-manifest.json');

module.exports = () => {
    const env = process.env.NODE_ENV || 'development';

    /**
     * Production Configuration
     */
    if (env === 'production') {
        return merge([
            Common,
            Parts.base(env),
            Parts.lintJS({
                path: join(__dirname, paths.source),
            }),
            Parts.SCSS(env),
        ]);
    }
    /**
     * Development Configuration
     */
    return merge([
        Parts.base(env),
        Common,
        Parts.devServer({
            paths: {
                source: join(__dirname, paths.source),
                destination: join(__dirname, paths.destination),
            },
            host: devServer.host,
            port: devServer.port,
        }),
        Parts.lintJS({
            path: join(__dirname, paths.source),
            options: {
                emitWarning: true,
            },
        }),
        Parts.SCSS(env),
    ]);
};
