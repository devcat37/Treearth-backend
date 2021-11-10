
export default class UserDto {

    // Уникальный ID, полученный при авторизации.
    uid;

    // ID пользователя в базе данных (mongo db).
    id;

    constructor(model) {
        this.uid = model.uid;
        this.id = model._id;
    }
}

