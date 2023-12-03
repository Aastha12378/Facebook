const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  try {
    const users = await User.find({}).select("username")
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log("🚀 ~ file: userController.js:17 ~ getUser ~ user:", user)
    // console.log(req.params.id);
    if (!user) {
      throw new Error("User does not exists");
    }

    const { password, ...others } = user._doc;
    // console.log(user._doc);

    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// const sendRequest = async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;

//     // Check if the users exist
//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);

//     if (!sender || !receiver) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if the friend request already exists
//     const existingRequest = await Friendship.findOne({
//       $or: [
//         { sender: senderId, receiver: receiverId },
//         { sender: receiverId, receiver: senderId },
//       ],
//       status: 'pending',
//     });

//     if (existingRequest) {
//       return res.status(400).json({ message: 'Friend request already sent' });
//     }

//     // Create a new friend request
//     const newRequest = new Friendship({
//       sender: senderId,
//       receiver: receiverId,
//       status: 'pending',
//     });

//     await newRequest.save();

//     res.status(200).json({ message: 'Friend request sent successfully' });
//   } catch (error) {
//     console.error('Error sending friend request:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const updateUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    // console.log(req.body);
    try {
      // const profilePic = req.files['profilePic'][0].filename;
      // console.log("🚀 ~ file: userController.js:77 ~ updateUser ~ profilePic:", profilePic)
      // const coverPic = req.files['coverPic'][0].filename;
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePic: req.body.profilePic,
            coverPic: req.body.coverPic,
          },
        },
        { new: true }
      );
      // console.log("🚀 ~ file: userController.js:86 ~ updateUser ~ updated:", updated)

      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(403).json({ msg: "You can update only your profile!" });
  }
};


const deleteUser = async (req, res) => {
  if (req.params.id === req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User does not exists");
      }

      await User.findByIdAndDelete(req.params.id);

      return res.status(200).json({ msg: "Successfully deleted!" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json({ msg: "You can delete only your profile!" });
  }
};

const pendingRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('pendingRequests', 'username');

    res.status(200).json({ pendingRequests: user.pendingRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const search = async (req, res) => {
  try {
    const { query } = req.params;

    const users = await User.find({ username: new RegExp(query, 'i') }).select("username");

    const filteredUsers = users.filter((user) => {
      return user.username && user.username.toLowerCase().includes("");
    });
    // console.log("Filtered Users:", filteredUsers);

    res.status(200).json(filteredUsers);

  } catch (error) {
    console.error('Error searching for users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// const search = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const users = await User.find({ _id: id });
//     console.log("🚀 ~ file: userController.js:160 ~ search ~ users:", users)

//     res.status(200).json({ users });
//   } catch (error) {
//     console.error('Error searching for users:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const getUserFriends = async (req, res) => {
  // console.log("----userFrineds");
  try {
    const user = await User.findById(req.params.id);
    // console.log("🚀 ~ file: userController.js:165 ~ getUserFriends ~ user:", user)
    if (!user) {
      throw new Error("User does not exists");
    }

    const userFriends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId).select("-password");
      })
    );

    if (userFriends.length > 0) {
      return res.status(200).json(userFriends);
    } else {
      throw new Error("You have no friends");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const followUser = async (req, res) => {
  try {
    const { id: friendId } = req.params;
    const { userId } = req.body;

    if (friendId === userId) {
      return res.status(400).json({ msg: "Can't follow yourself" });
    }

    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (friend.followers.includes(userId)) {
      return res.status(400).json({ msg: "Can't follow the same user twice" });
    }

    await User.findByIdAndUpdate(req.params.id, { $push: { followers: req.user.id } });
    // await User.findByIdAndUpdate(req.user.id, { $push: { followings: req.params.id } });

    return res.status(200).json({ msg: "User successfully followed" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { id: friendId } = req.params;
    const { userId } = req.body;
    
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    if (friend.followers.includes(userId)) {
      return res.status(400).json({ msg: "Can't unfollow someone you don't follow in the first place" });
    }

    await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user.id } });
    // await User.findByIdAndUpdate(req.user.id, { $pull: { followings: req.params.id } });

    return res.status(200).json({ msg: "User successfully unfollowed" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const view = async (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!err) {
      // Convert the user document to a plain JavaScript object
      const userData = user.toObject();

      // Render the profile page with the user's data, including the cover and profile images
      res.render('profile/:id', {
        menu: userData,
        coverImage: userData.coverPicture,
        profileImage: userData.profilePicture
      });
    } else {
      // Handle the error (e.g., send a response with a status code of 500 and the error message)
      res.status(500).json({ error: err.message });
    }
  });
};

const data = async (req, res) => {
  const { profilePic, coverPic } = req.body;

  if (!profilePic || !coverPic) {
    return res.status(400).json({ find: 'Cover picture and profile picture are required' });
  }

  User.findByIdAndUpdate(
    req.params.id,
    { profilePicture: profilePic, coverPicture: coverPic },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect(`/profile/${req.params.id}`);
      } else {
        console.log('Error During Record Update :( ' + err);
        res.status(500).json({ error: err.message });
      }
    }
  );
};
// Search for users
const searchUsers = async (req, res) => {
  try {
    const { query } = req.params; // The search query

    // Find users where the username matches the query
    const users = await User.find({ username: new RegExp(query, 'i') });

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error searching for users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getUser,
  updateUser,
  pendingRequests,
  search,
  deleteUser,
  // sendRequest,
  getUserFriends,
  followUser,
  unfollowUser,
  getAll,
  view, data,
  searchUsers
};