const webpack = require('webpack');

module.exports = {
    devServer: {
        hot: true,
        host: 'localhost',
        port: 3000,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api/': {
                target: 'http://localhost:5000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('Chloek')
        })
    ]
}