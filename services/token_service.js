import TokenModel from '../models/token_model.js'
import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = '4b&uH`>PD^+@"3fP';
const JWT_REFRESH_SECRET = 'Nc9"Zp&$[ayPs=3p';

class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '1h'});
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = TokenModel.create({user: userId, refreshToken});
        return token;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({refreshToken: refreshToken});
        return tokenData;
    }
}

export default new TokenService();