const errorHandlingMiddleware = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;

    const responseError = {
        statusCode : err.statusCode,
        message : err.message,
        data : err.data
    }

    res.status(res.statusCode).json(responseError)
}

module.exports = errorHandlingMiddleware