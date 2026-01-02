const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(err => err.message);
        statusCode = 400;
        message = messages.join(', ');
    }

    res.status(statusCode).json({
        success: false,
        message: message
    })
}

export { errorMiddleware }