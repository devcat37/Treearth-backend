export default class TrashSpotDto {
    // ID точки в базе данных (mongo db).
    id;

    // Расположение точки с мусором на карте.
    position;

    // Изображение.
    imageUrl;

    // Тип, говорящий о том, что это точка с мусором.
    type;

    constructor(model) {
        this.id = model._id;
        this.position = model.position;
        this.imageUrl = model.imageUrl;
        this.type = 'TRASH';
    }
}