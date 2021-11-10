import ApiError from "../exceptions/api_error.js";

export default function(err, req, res, next) {
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            data: {},
            error: {message: err.message, errors: err.errors}
        });
    }
    return res.status(500).json({
        data: {},
        error: {message: 'Непредвиденная ошибка'}
    });
}