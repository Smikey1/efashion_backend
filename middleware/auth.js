const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports.verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        console.log(authHeader)
        const accessToken = authHeader && authHeader.split(" ")[1]
        if (accessToken == null) return res.sendStatus(401)
        const authUser = jwt.verify(accessToken, "myToken")
        console.log(authUser)
        const user = await User.findOne({
            _id: authUser.id
        })
        if (user) {
            req.user = user
            next()
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.log(err)
    }
}