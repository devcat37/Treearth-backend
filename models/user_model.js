import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    uid: {type: String, unique: true, required: true},
});

export default mongoose.model('User', UserSchema);