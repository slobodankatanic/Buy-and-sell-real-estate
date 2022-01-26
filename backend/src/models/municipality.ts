import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Municipality = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    city: {
        type: String
    }
})

export default mongoose.model('Municipality', Municipality, 'municipalities');