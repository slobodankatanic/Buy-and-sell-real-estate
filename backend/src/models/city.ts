import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let City = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
})

export default mongoose.model('City', City, 'cities');