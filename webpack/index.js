const merge = require('webpack-merge');

const Common = require('./webpack.config');
const Parts = require('./webpack.parts');
const Config = require('./config');

module.exports = () => {
    /**
     * Production Configuration
     */
    if (Config.env === 'production') {
        return merge([
            Common,
            Parts.base(),
            Parts.lintJS(),
            Parts.SCSS(),
        ]);
    }

    /**
     * Development Configuration
     */
    return merge([
        Parts.base(),
        Common,
        Parts.devServer(),
        Parts.lintJS({
            emitWarning: true,
        }),
        Parts.SCSS(),
    ]);
};
