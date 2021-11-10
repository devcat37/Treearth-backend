import ApiError from "../exceptions/api_error.js";
import TokenService from "../services/token_service.js";

export default function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError());    
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if(!userData) {
            throw ApiError.UnauthorizedError();
        }

        req.user = userData;
        next();
    }
    catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}