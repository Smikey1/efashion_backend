console.log("please wait...")
console.log("Connecting to your database server...")
const mongoose = require('mongoose')
// connection with db called eFashion
mongoose.connect('mongodb+srv://efashion_user:efashion_user@sandbox.eewjy.mongodb.net/efashion', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})