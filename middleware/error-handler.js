const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    // set defaults
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later'
  }


    if (err.name === 'CastError') {
    //customError.msg = `Missing values for ${Object.values(err.errors)} field, please enter another value`
      customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }


  if (err.name === 'ValidationError') {
    //customError.msg = `Missing values for ${Object.values(err.errors)} field, please enter another value`
    customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for the ${Object.keys(err.keyValue)} field, please enter another value`
    customError.statusCode = 400;
  }

 //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandlerMiddleware
