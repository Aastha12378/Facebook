const multer = require('multer');
const { getUser, getAll, pendingRequests,searchFriend,getPendingRequest, updateUser, view,data,acceptRequest, sendRequest,rejectSendingRequest, deleteUser, getUserFriends, followUser, unfollowUser } = require('../controllers/userController')
const verifyToken = require('../middleware/auth');
const userRouter = require('express').Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Define the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      console.log("🚀 ~ file: user.js:10 ~ file:", file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
const upload = multer({
    storage: storage
});

userRouter.get('/findAll', getAll)
userRouter.get('/find/:id', getUser)
// userRouter.get('/pendingRequests', verifyToken, pendingRequests)
userRouter.get('/find/userfriends/:id', getUserFriends)
userRouter.get('/searchFriend/:query',searchFriend)

// userRouter.put('/sendRequest/:id', verifyToken, sendRequest)
userRouter.put('/update/:id', verifyToken, upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), updateUser)
// userRouter.get("/update/:id", verifyToken, view)
userRouter.put("/follow/:id", verifyToken, sendRequest)
userRouter.put('/unfollow/:id', verifyToken, unfollowUser)
userRouter.put('/reject-request/:id', verifyToken, rejectSendingRequest)
userRouter.get('/pendingReq/:id', verifyToken, getPendingRequest)
userRouter.put('/accept-request/:id', verifyToken, acceptRequest)


userRouter.delete('/delete/:id', verifyToken, deleteUser)

module.exports = userRouter