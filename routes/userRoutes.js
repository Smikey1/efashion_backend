const express = require('express');
const authorize = require("../middleware/auth")
const upload = require('../middleware/fileUpload')
const router = new express.Router();
const userController = require("../controllers/userController")
// Insert User into db
router.post('/user/register', userController.register_new_user)
// for login
router.post('/user/login', userController.user_log_in)

router.put('/user/update/:id', authorize.verifyUser, userController.update_user)

router.put('/user/change-password/:id', authorize.verifyUser, userController.change_password)

router.get("/user/profile", authorize.verifyUser, userController.get_user_details)

router.get("/user/get", authorize.verifyUser, userController.get_all_user_details)

router.delete("/user/delete/:id", authorize.verifyUser, userController.delete_user_by_Id)

router.put('/user/profile/upload/:id', userController.file_upload)

//exporting router
module.exports = router