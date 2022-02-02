import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Agency = new Schema({
    pib: {
        type: Number
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    telephone: {
        type: String
    },
    city: {
        type: String
    }
})

export default mongoose.model('Agency', Agency, 'agency');