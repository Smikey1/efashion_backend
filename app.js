const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');
require("dotenv").config()


// folder name then file name
require('./dbConnection/dbConnection')

const blogRoutes = require("./routes/blogRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const ratingRoutes = require("./routes/ratingRoutes")
const user = require('./routes/userRoutes');
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes")
const cartRoutes = require("./routes/cartRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")
const orderRoutes = require("./routes/orderRoutes")
const bannerRoutes = require("./routes/bannerRoutes")

// load express engine
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));

app.use(cors())
app.use(morgan("tiny"))

// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles: true
}));
// app.use(express.static("upload"))
// app.use('/assets', express.static('upload'))

app.use(blogRoutes)
app.use(reviewRoutes)
app.use(ratingRoutes)
app.use(user)
app.use(productRoutes)
app.use(categoryRoutes)
app.use(cartRoutes)
app.use(wishlistRoutes)
app.use(orderRoutes)
app.use(bannerRoutes)


// configuring the server
const port = 90
app.listen(port, () => {
    console.log(`Server started running at http://localhost:${port}`)
    console.log("Database Connected...")
})