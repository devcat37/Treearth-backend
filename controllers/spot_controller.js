import SpotService from "../services/spot_service.js";

class SpotController {
    async getAll(req, res, next) {
        try {
            const spotsData = await SpotService.getAll();

            res.json({
                data: spotsData,
            });
        }
        catch (e) {
            next(e);
        }
    }

    async getInRadius(req, res, next) {
        try {
            const { latitude, longtitude, radius } = req.query;
            const spotsData = await SpotService.getInRadius(latitude, longtitude, radius);

            res.json({
                data: spotsData,
            });
        }
        catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const spotData = await SpotService.create();

            res.json({
                data: spotData,
            });
        }
        catch (e) {
            next(e);
        }
    }
}

export default new SpotController();