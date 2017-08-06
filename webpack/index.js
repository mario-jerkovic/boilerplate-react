const { join } = require('path');
const merge = require('webpack-merge');

const Common = require('./webpack.config');
const Parts = require('./webpack.parts');

module.exports = () => {
    const env = process.env.NODE_ENV || 'development';

    const sourcePath = join(process.cwd(), 'src');
    const destinationPath = join(process.cwd(), 'public');

    const publicPath = '/';
    const devServerHost = 'localhost';
    const devServerPort = 3000;

    /**
     * Production Configuration
     */
    if (env === 'production') {
        return merge([
            Common(env, { sourcePath }),
            Parts.base(env, {
                publicPath,
                destinationPath,
            }),
            Parts.lintJS({
                path: sourcePath,
            }),
            Parts.SCSS(env),
        ]);
    }

    /**
     * Development Configuration
     */
    return merge([
        Parts.base(env, {
            publicPath,
            destinationPath,
        }),
        Common(env, { sourcePath }),
        Parts.devServer({
            publicPath,
            destinationPath,
            host: devServerHost,
            port: devServerPort,
        }),
        Parts.lintJS({
            sourcePath,
            options: {
                emitWarning: true,
            },
        }),
        Parts.SCSS(env),
    ]);
};
