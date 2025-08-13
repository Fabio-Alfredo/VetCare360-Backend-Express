
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);
  return res
    .status(err.status || 500)
    .json({
      error: err.message || "Error interno del servidor",
      succes: false
    });
}

export default errorHandler;
