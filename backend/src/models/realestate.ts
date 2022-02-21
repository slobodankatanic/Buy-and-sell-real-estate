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
    cityId: {
        type: Number
    },
    city: {
        type: String
    },
    municipalityId: {
        type: Number
    },
    municipality: {
        type: String
    },
    microlocationId: {
        type: Number
    },
    microlocation: {
        type: String
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
    },
    averagePrice: {
        type: Number
    },
    about: {
        type: String
    },
    sold: {
        type: Number
    },
    lastChange: {
        type: String
    },
    postedAt: {
        type: String
    },
    images: {
        type: Array
    },
    transportLines: {
        type: Array
    },
    advertiserId: {
        type: String
    },
    characteristics: {
        type: Array
    }
    // teracce: {
    //     type: Number
    // },
    // basement: {
    //     type: Number
    // },
    // internet: {
    //     type: Number
    // },
    // loggia: {
    //     type: Number
    // },
    // garage: {
    //     type: Number
    // },
    // interphone: {
    //     type: Number
    // },
    // balcony: {
    //     type: Number
    // },
    // garden: {
    //     type: Number
    // },
    // telephone: {
    //     type: Number
    // },
    // elevator: {
    //     type: Number
    // },
    // airConditioning: {
    //     type: Number
    // }
})

export default mongoose.model('RealEstate', RealEstate, 'realestates');