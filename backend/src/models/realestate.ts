import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let RealEstate = new Schema({
    id: {
        type: Number
    },
    type: {
        type: String
    },
    name: {
        type: String
    },
    municipalityId: {
        type: Number
    },
    microlocationId: {
        type: Number
    },
    street: {
        type: String
    },
    area: {
        type: Number
    },
    rooms: {
        type: Number
    },
    constructionYear: {
        type: Number
    },
    state: {
        type: String
    },
    heating: {
        type: String
    },
    floor: {
        type: Number
    },
    totalFloors: {
        type: Number
    },
    parking: {
        type: String
    },
    monthlyUtilities: {
        type: Number
    },
    price: {
        type: Number
    }
})

export default mongoose.model('RealEstate', RealEstate, 'realestates');