const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api',{
            target: 'https://test-a81ab.firebaseapp.com/',
            changeOrigin: true
        })
    )

}