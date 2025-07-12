
const responseHandler = (res, status, message = null, data = {}) => {
  return res
    .status(status || 200)
    .json({
      succes: true,
      message: message,
      data: data
    })
}

export default responseHandler;
