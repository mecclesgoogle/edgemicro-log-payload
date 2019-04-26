'use strict';
var os = require('os');

module.exports.init = function(config, logger, stats) {

  const formatHeaders = (headers) => {
    let requestHeadersString = "";
    for(var header in headers) {
      requestHeadersString += os.EOL;
      if ((/authorization/i).test(header)) {
        requestHeadersString += `${header}: ***`;
      } else {
        requestHeadersString += `${header}: ${headers[header]}`;
      }
    }
    return requestHeadersString;
  }

  return {

    onend_request: function(req, res, data, next) {
      logger.info(`Request Headers: ${formatHeaders(req.headers)}`);
      logger.info(`Request payload:${os.EOL}${data}`);
      next(null, data);
    },

    onend_response: function(req, res, data, next) {
      logger.info(`Response Headers: ${formatHeaders(res.getHeaders())}`);
      logger.info(`Response payload:${os.EOL}${data}`);
      next(null, data);
    },

    onerror_response: function(req, res, err, next) {
      logger.info(`Response Headers: ${formatHeaders(res.getHeaders())}`);
      logger.info(`Response payload:${os.EOL}${data}`);
      next();
    }
   
  };
}