// handler.js

// Middleware para manejar errores generales y excepciones no capturadas
function errorHandler(err, req, res, next) {
    console.error('Error:', err.stack);  // Log detallado del error en la consola
  
    const statusCode = err.status || 500;  // Código de estado (500 si no se especifica)
    const message = err.message || 'Error interno del servidor';
  
    // Respuesta JSON para errores, útil para debug y producción
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        status: statusCode,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,  // Ocultar la traza en producción
      },
    });
  }
  
  // Middleware para manejar rutas no encontradas
  function notFoundHandler(req, res, next) {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
  }
  
  // Función para enviar respuestas exitosas de manera uniforme
  function successResponse(res, data, message = 'Operación exitosa') {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  }
  
  // Función para generar errores personalizados en controladores
  function customError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
  }
  
  // Middleware para manejar excepciones no controladas en el proceso
  function unhandledRejectionHandler() {
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // Puedes enviar notificaciones o registrar el error en un servicio externo aquí
    });
  }
  
  function uncaughtExceptionHandler() {
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      // Posiblemente quieras terminar el proceso si ocurre una excepción no capturada
      process.exit(1);
    });
  }
  
  module.exports = {
    errorHandler,
    notFoundHandler,
    successResponse,
    customError,
    unhandledRejectionHandler,
    uncaughtExceptionHandler,
  };
  