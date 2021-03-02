'use strict';
var os = require('os');

const LOG_TAG_COMP = 'log-payload';

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
      logger.eventLog(
        {level:'info', req: req, res: res, err: null, component:LOG_TAG_COMP }, 
        `Request Headers: ${formatHeaders(req.headers)}`);
      logger.eventLog(
        {level:'info', req: req, res: res, err: null, component:LOG_TAG_COMP }, 
        `Request payload:${os.EOL}${data}`);
      next(null, data);
    },

    onend_response: function(req, res, data, next) {
      logger.eventLog(
        {level:'info', req: req, res: res, err: null, component:LOG_TAG_COMP }, 
       `Response Headers: ${formatHeaders(res.getHeaders())}`);
      logger.eventLog(
        {level:'info', req: req, res: res, err: null, component:LOG_TAG_COMP }, 
        `Response payload:${os.EOL}${data}`);
      next(null, data);
    },

    onerror_response: function(req, res, err, next) {
      logger.eventLog(
        {level:'info', req: req, res: res, err: err, component:LOG_TAG_COMP },
        `Response Headers: ${formatHeaders(res.getHeaders())}`
      );
      next();
    }
   
  };
}
