import AuthService from "../services/auth_service.js";

class AuthController {
    async registration(req, res, next) {
        try {
            const { uid } = req.body;
            const userData = await AuthService.registration(uid);

            res.json({
                data: userData,
            });
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { uid } = req.body;
            const userData = await AuthService.login(uid);

            res.json({
                data: userData,
            });
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            res.json('Logout');
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const userData = await AuthService.refresh(refreshToken);

            return res.json({
                data: userData,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();