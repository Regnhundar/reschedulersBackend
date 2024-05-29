const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        status: err.status
    });
}

export default errorHandler;