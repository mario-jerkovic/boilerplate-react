import sass from 'node-sass';
import cssRequireHook from 'css-modules-require-hook';

cssRequireHook({
    extensions: '.scss',
    generateScopedName: '[name]__[local]___[hash:base64:5]',
    preprocessCss: (data, filename) =>
        sass.renderSync({
            data,
            file: filename,
        }).css,
});
