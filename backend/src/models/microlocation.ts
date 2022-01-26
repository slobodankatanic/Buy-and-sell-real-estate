import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Microlocation = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    municipality: {
        type: Number
    },
    streets: {
        type: Array
    }
})

export default mongoose.model('Microlocation', Microlocation, 'microlocations');