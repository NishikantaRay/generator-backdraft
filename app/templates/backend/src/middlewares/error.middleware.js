import HttpStatus from 'http-status-codes';

import logger from '../config/logger';


export function notFound(req, res) {
  res.status(HttpStatus.NOT_FOUND).json({
    code: HttpStatus.NOT_FOUND,
    message: 'Ooops, route not found'
  });
}


export function appErrorHandler(err, req, res, next) {
  if (err.code && typeof err.code === 'number') {
    logger.error(`
      status - ${err.code}
      message - ${err.message} 
      url - ${req.originalUrl} 
      method - ${req.method} 
      IP - ${req.ip}
    `);
    res.status(err.code).json({
      code: err.code,
      message: err.message
    });
  } else {
    next(err);
  }
}

export function genericErrorHandler(err, req, res, next) {
  logger.error(`
    status - ${HttpStatus.INTERNAL_SERVER_ERROR} 
    message - ${err.stack} 
    url - ${req.originalUrl} 
    method - ${req.method} 
    IP - ${req.ip}
  `);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: '',
    message: err.message
  });
}