const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/dev/task-type', { 
    target: 'https://53lsdx4cm6.execute-api.us-east-1.amazonaws.com',
    changeOrigin: true
  }));
};
