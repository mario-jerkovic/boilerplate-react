const { join } = require('path');

const env = process.env.NODE_ENV || 'development';

const paths = {
    source: join(process.cwd(), 'src'),
    destination: join(process.cwd(), 'public'),
};

const devServer = {
    publicPath: '/',
    host: 'localhost',
    port: 3000,
};

module.exports = {
    env,
    paths,
    devServer,
};
