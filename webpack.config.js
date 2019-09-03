const dir = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        path: dir.resolve(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'] },
            { test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    }
};
