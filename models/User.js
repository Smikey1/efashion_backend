const mongoose = require('mongoose')

// creating tables for users
const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: 'Email address is required',
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    dob: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['Admin', 'Customer'],
        default: 'Customer'
    },
    profilePicUrl: {
        type: String,
        default: 'https://png.pngtree.com/png-clipart/20190629/original/pngtree-vector-edit-profile-icon-png-image_4102545.jpg'
    }

})

// exporting customer from db with table name User + "s"
module.exports = mongoose.model('User', userSchema)