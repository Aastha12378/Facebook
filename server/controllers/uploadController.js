const multer = require("multer")
const uploadRouter = require("express").Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.imageUrl)
    }
})

const upload = multer({ storage: storage });

uploadRouter.post('/', upload.single('photo'), (req, res) => {
    console.log(req.body)
    try {
        return res.status(201).json({ msg: 'Successfully uploaded' })
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = uploadRouter

// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Define the directory where uploaded files will be stored
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// ...

// app.put('/user/update/:userId', upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), async (req, res) => {
//   const { userId } = req.params;
//   const { username, email } = req.body;

//   // Check if profilePic and coverPic exist in req.files and update the database accordingly
//   const profilePic = req.files['profilePic'] ? req.files['profilePic'][0].filename : null;
//   const coverPic = req.files['coverPic'] ? req.files['coverPic'][0].filename : null;

//   // Update the user in the database with the new data
//   // ...

//   res.json({ message: 'Profile updated successfully' });
// });
