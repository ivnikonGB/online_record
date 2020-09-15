module.exports = {
    devServer: {
        port: 8080,
        publicPath: '/',
        proxy: {
            '/api': {
                target: 'http://localhost:3000/api/v1',
                pathRewrite: { '^/api' : '' },
                secure: false,
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}