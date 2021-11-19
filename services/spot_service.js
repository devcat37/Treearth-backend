import PlantSpotDto from "../dtos/plant_spot_dto.js";
import TrashSpotDto from "../dtos/trash_spot_dto.js";
import ApiError from "../exceptions/api_error.js";
import PlantSpotModel from "../models/plant_spot_model.js";
import TrashSpotModel from "../models/trash_spot_model.js";

class SpotService {
    async getAll() {
        const plantSpots = await this.getAllPlant();
        const trashSpots = await this.getAllTrash();

        return [...plantSpots, ...trashSpots];
    }

    async getInRadius(latitude, longtitude, radius) {
        if (!latitude || !longtitude || !radius) {
            throw ApiError.BadRequestError('Параметры position и radius обязательные и не были получены!')
        }

        const plantSpots = await PlantSpotModel.find({
            // Проверка на нахождение точки в радиусе.
            $and: [
                {type: "PLANT"},
                {
                    'position.latitude': { $lt: Number(latitude) + Number(radius) },
                    'position.longtitude': { $lt: Number(longtitude) + Number(radius) }
                    
                },
                {
                    'position.latitude': { $gt: Number(latitude) - Number(radius) },
                    'position.longtitude': { $gt: Number(longtitude) - Number(radius) }
                    
                },
            ]
        });

        const plantSpotDtos = plantSpots.map(function(plant) {
            return new PlantSpotDto(plant);
        });

        const trashSpots = await TrashSpotModel.find({
            // Проверка на нахождение точки в радиусе.
            $and: [
                {type: "TRASH"},
                {
                    'position.latitude': { $lt: Number(latitude) + Number(radius) },
                    'position.longtitude': { $lt: Number(longtitude) + Number(radius) }
                    
                },
                {
                    'position.latitude': { $gt: Number(latitude) - Number(radius) },
                    'position.longtitude': { $gt: Number(longtitude) - Number(radius) }
                    
                },
            ]
        });

        const trashSpotDtos = trashSpots.map(function(trash) {
            return new TrashSpotDto(trash);
        });

        return [...plantSpotDtos, ...trashSpotDtos];
    }

    async getAllPlant() {
        const spots = await PlantSpotModel.find({type: "PLANT"});

        const plantSpotDtos = spots.map(function(plant) {
            return new PlantSpotDto(plant);
        });

        return plantSpotDtos;
    }

    async getAllTrash() {
        const spots = await TrashSpotModel.find({type: "TRASH"});

        const trashSpotDtos = spots.map(function(trash) {
            return new TrashSpotDto(trash);
        });

        return trashSpotDtos;
    }

    async create() {
        // Создание точки в базе данных.
        const spot = await PlantSpotModel.create({
            title: "Пихта",
            position: {
                latitude: 56.02421412,
                longtitude: 18.0424324
            },
        });

        return spot;
    }
}

export default new SpotService();