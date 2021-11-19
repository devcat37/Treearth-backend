export default class PlantSpotDto {
    // ID точки в базе данных (mongo db).
    id;

    // Название растительности.
    title;

    // Расположение точки с растительностью на карте.
    position;

    // Изображение.
    imageUrl;

    // Тип, говорящий о том, что это точка с растительностью.
    type;

    constructor(model) {
        this.id = model._id;
        this.position = model.position;
        this.title = model.title;
        this.imageUrl = model.imageUrl;
        this.type = 'PLANT';
    }
}