import mongoose from 'mongoose'

const TrashSpotSchema = mongoose.Schema({
    position: {type: mongoose.SchemaTypes.Map, required: true},
    imageUrl: {type: mongoose.SchemaTypes.String},
    type: {type: mongoose.SchemaTypes.String, required: true},
});

export default mongoose.model('TrashSpot', TrashSpotSchema, 'spots');