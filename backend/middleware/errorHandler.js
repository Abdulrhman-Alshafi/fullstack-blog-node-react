/// error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode(statusCode);

  res.json({
    message: err.message,
  });
};
export default errorHandler;
