const { validationResult } = require('express-validator');


function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array(), 
    });
  }
  next();
}


function errorHandler(err, req, res, next) {
  console.error('Error:', err.stack); 

  const statusCode = err.status || 500; 
  const message = err.message || 'Error interno del servidor';


  res.status(statusCode).json({
    success: false,
    error: {
      message,
      status: statusCode,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
    },
  });
}

function notFoundHandler(req, res, next) {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
}

function successResponse(res, data, message = 'Operación exitosa') {
  res.status(200).json({
    success: true,
    message,
    data,
  });
}

function customError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function unhandledRejectionHandler() {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   
  });
}

function uncaughtExceptionHandler() {
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);

    process.exit(1);
  });
}

module.exports = {
  handleValidationErrors,
  errorHandler,
  notFoundHandler,
  successResponse,
  customError,
  unhandledRejectionHandler,
  uncaughtExceptionHandler,
};
