// react_start/webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// For Typescript
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'js/app': ['./src/index.tsx'],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: 'babel-loader'
            },
            {
                test: /\.(css)$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new ForkTsCheckerWebpackPlugin() // Typescript 컴파일 속도 향상을 위한 플러그인
    ],
    stats: 'errors-only'
}