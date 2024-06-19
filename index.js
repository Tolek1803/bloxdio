const { createProxyMiddleware } = require('http-proxy-middleware');
const { createServer } = require('http');

const proxyConfig = {
    target: 'https://www.crazygames.com/game/bloxdhop-io',
    changeOrigin: true,
    selfHandleResponse: false, // Allow the proxy middleware to handle responses
    logLevel: 'debug',
    pathRewrite: {
        '^/proxy': '', // Remove /proxy from the beginning of the URL path
    },
};

const proxy = createProxyMiddleware(proxyConfig);

// Serverless function handler
const requestHandler = (req, res) => {
    proxy(req, res, (err) => {
        if (err) {
            res.statusCode = 500;
            res.end(`Proxy error: ${err.message}`);
        }
    });
};

module.exports = (req, res) => {
    createServer(requestHandler).emit('request', req, res);
};
