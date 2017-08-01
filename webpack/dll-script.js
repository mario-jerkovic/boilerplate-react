/* eslint-disable */
const fs = require('fs');
const debug = require('debug')('webpack-dll');
const crypto = require('crypto');
const { join } = require('path');
const { spawn } = require('child_process');

const { entry, output, plugins } = require('./webpack.dll.config');

const fileName = '.temp';
const forceCommand = '--force';

function getOldDepHash() {
    if (fs.existsSync(fileName)) {
        return fs.readFileSync(fileName, 'utf8');
    }

    return null;
}

function getDepHash() {
    const packageJSON = JSON.parse(fs.readFileSync(join(__dirname, '../', 'package.json'), 'utf8'));
    const dependenciesString = JSON.stringify(
        Object.assign({},
            packageJSON.dependencies,
            packageJSON.devDependencies
        )
    );

    return crypto
        .createHash('sha1')
        .update(dependenciesString)
        .digest('hex');
}

function writeHash(hash) {
    fs.writeFileSync(fileName, hash);
}

function runDLLBuild() {
    const child = spawn('./node_modules/.bin/webpack', [
        '--progress',
        '--colors',
        '--config',
        join(__dirname, 'webpack.dll.config.js')
    ]);

    child.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
        process.stdout.write(data);
    });

    child.on('exit', () => {
        child.kill();
    });
}

const newHash = getDepHash();
const oldHash = getOldDepHash();
const force = process.argv.includes(forceCommand);

const namePlaceholder = new RegExp(/\[(.*?)]/g);
const bundlePath = join(output.path, output.filename.replace(namePlaceholder, ...Object.keys(entry)));
const manifestPath = join(plugins[0].options.path.replace(namePlaceholder, ...Object.keys(entry)));

if (force) {
    runDLLBuild();

    debug('Force building dependencies');
} else if (newHash !== oldHash) {
    writeHash(newHash);
    runDLLBuild();

    if (!oldHash) {
        debug('Dependencies hash missing. Generating and building...');
    } else {
        debug('Detected changes in dependencies');
    }

} else if (!fs.existsSync(bundlePath) || !fs.existsSync(manifestPath)) {
    runDLLBuild();

    debug('DLL modules missing in output directory. Building...');
} else {
    debug('No changes in dependencies detected');
}
