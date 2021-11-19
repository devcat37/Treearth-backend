import mongoose from 'mongoose'

const PlantSpotSchema = mongoose.Schema({
    title: {type: mongoose.SchemaTypes.String, required: true},
    position: {type: mongoose.SchemaTypes.Map, required: true},
    imageUrl: {type: mongoose.SchemaTypes.String},
    type: {type: mongoose.SchemaTypes.String, required: true},
});

export default mongoose.model('PlantSpot', PlantSpotSchema, 'spots');