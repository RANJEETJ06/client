const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app:any) {
  app.use('/api', createProxyMiddleware({ target: process.env.PROXY_URL, changeOrigin: true }));
};
