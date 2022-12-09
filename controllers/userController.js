const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2

exports.register_new_user = function (req, res) {

    // here username in req.body.username must match with json file in postman
    // object de-structuring
    console.log(req.body)
    const { fullname, email, password, role, address, phone, gender, dob } = req.body

    const createdUsername = fullname.split(" ")[0] + "@efashion.com"
    bcrypt.hash(password, 10, function (err, hashPassword) {
        const data = new User({
            fullname: fullname,
            username: createdUsername,
            email: email.toLowerCase(),
            password: hashPassword,
            gender: gender,
            address: address,
            phone: phone,
            dob: dob,
            role: role
        });

        // var data = new Users(req.body); - this is for sending all data at the same time but can't validate

        data.save()
            .then(function (result) {
                res.status(201).json({
                    success: true,
                    message: "Registered successfully"
                })
            })
            .catch(function (err) {
                res.status(500).json({
                    success: false,
                    message: err
                })
            })

    })

}

exports.user_log_in = async function (req, res) {
    const email = req.body.email; //  from form
    const password = req.body.password; // form form
    // check if username is valid or not
    const user = await User.findOne({
        email: email
    })
        .then(async function (user) {
            console.log(user)
            if (user === null) {
                // no user found

                return res.json({
                    success: false,
                    message: "Incorrect email or password"
                })
            }
            // user found

            await bcrypt.compare(password, user.password, function (err, result1) {
                console.log(result1)
                if (result1 === false) {
                    return res.json({
                        success: false,
                        message: "Username/password not found!!"
                    })
                }
                // res.status(200).json({
                //     message: "Login successful!!",
                // })
                const token = jwt.sign({
                    id: user._id,
                    msg: "This is my token"
                }, "myToken")
                res.send({
                    success: true,
                    accessToken: token,
                    data: user

                })
            })
        })
        .catch(function (error) {
            res.status(500).json({
                success: false,
                error: error
            });
        })
}

exports.update_user = async function (req, res) {

    const id1 = req.params.id;
    const { fullname, username, address, phone, role } = req.body
    console.log(req.body)
    try {
        let updatedUser = await User
            .updateOne(
                { _id: id1 },
                { username: username, address: address, phone: phone, fullname: fullname, role: role })
        res.status(201).json({
            success: true,
            message: "User Updated Succesfully!",
            // async and await ma return garne tarika
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.end()
} // update user

exports.change_password = async function (req, res) {
    try {
        const userId = req.params.id
        // const userId = req.user._id
        const password = req.body.password
        const hash = await bcrypt.hash(password, 10)
        const response = await User.updateOne({ _id: userId }, { password: hash })
        console.log(response)
        res.status(201).json({ success: true, message: "Password changed successfully" })
    } catch (error) {
        res.status(501).json({ success: false, error: error, message: "Error in change password" })
    }
    res.end()
}
exports.get_user_details = async function (req, res) {
    try {
        console.log(req.user)
        const id = req.user._id
        const users = await User.findOne({ _id: id })
        res.status(201).json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
    res.end()
}

exports.get_all_user_details = async function (req, res) {
    try {
        const users = await User.find()
        res.status(201).json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
    res.end()
}

// delete user by Id
exports.delete_user_by_Id = async function (req, res) {
    const id = req.params.id;
    try {
        await User.deleteOne({
            _id: id
        })
        res.status(201).json({
            success: true,
            message: "User Deleted Succesfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} // delete user by Id

exports.file_upload = async function (req, res) {
    const id = req.params.id
    const user = await User.findOne({ _id: id })
    try {
        console.log(req.files)
        const formImage = req.files.file
        const imagePath = formImage.tempFilePath
        const image = await cloudinary.uploader.upload(imagePath, {
            public_id: user.fullname + Date.now(),
            folder: "Profile"
        })
        user.profilePicUrl = image.secure_url
        await user.save()
        res.status(201).json({
            success: true,
            message: "profile picture upload successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
    res.end()
}