const multer = require('multer');

const storage = multer.diskStorage({
    //(Where to store files)
    destination: function (req, file, cb) {
        cb(null, './upload') // here files is the foldername
    },
    filename: function (req, file, cb) {
        const newFilename = Date.now() + file.originalname
        cb(null, newFilename)
        req.uploadedImage = newFilename
    }
})
// const filter = "abc";
const upload = multer({ // destination + validation
    storage: storage,
    // fileFilter: filter
});



module.exports = upload;