import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    city: {
        type: String
    },
    dob: {
        type: String
    },
    telephone: {
        type: String
    },
    email: {
        type: String
    },
    agencyId: {
        type: Number
    },
    licence: {
        type: Number
    },
    status: {
        type: String
    },
    image: {
        type: String
    },
    favorites: {
        type: Array
    }
})

export default mongoose.model('User', User, 'users');