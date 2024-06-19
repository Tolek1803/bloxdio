const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyConfig = {
    target: 'https://www.crazygames.com',
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: {
        '^/': '', // Rewrite path to remove leading '/'
    },
};

const proxy = createProxyMiddleware(proxyConfig);

module.exports = (req, res) => {
    return proxy(req, res);
};
