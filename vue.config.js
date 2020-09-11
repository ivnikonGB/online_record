module.exports = {
    devServer: {
        port: 8080,
        publicPath: '/',
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
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