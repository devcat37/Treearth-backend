import UserModel from '../models/user_model.js'
import TokenService from './token_service.js';
import UserDto from '../dtos/user_dto.js';
import ApiError from '../exceptions/api_error.js';

class AuthService {
    async registration(userId) {
        const candidate = await UserModel.findOne({uid: userId});
        if (candidate) {
            throw ApiError.BadRequestError('Пользователем с ID: ' + userId + ' уже существует!');
        }

        // Создание пользователя в базе данных.
        const user = await UserModel.create({uid: userId});

        const userDto = new UserDto(user);
        // Создание пары access и refresh токенов.
        const tokens = TokenService.generateTokens({...userDto});
        // Сохранение refresh токена пользователя.
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async login(userId) {
        const user = await UserModel.findOne({uid: userId});
        if (!user) {
            throw ApiError.BadRequestError('Пользователь не найден');
        }

        const userDto = new UserDto(user);
        // Создание пары access и refresh токенов.
        const tokens = TokenService.generateTokens({...userDto});
        // Сохранение refresh токена пользователя.
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDatabase = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDatabase) {
            throw ApiError.UnauthorizedError();
        }

        // Обновляем модель пользователя.
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        // Создание пары access и refresh токенов.
        const tokens = TokenService.generateTokens({...userDto});
        // Сохранение refresh токена пользователя.
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
}

export default new AuthService();