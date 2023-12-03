const User = require('../models/User');
const FriendRequest = require('../models/Friend');

// Create friend request
const createFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    console.log("🚀 ~ file: friendController.js:8 ~ createFriendRequest ~ req.body:", req.body)

    const existingRequest = await FriendRequest.findOne({ senderId, receiverId });
    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    const friendRequest = new FriendRequest({ senderId, receiverId });
    await friendRequest.save();

    res.status(201).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const friendRequests = await FriendRequest.find({ receiverId: userId }).populate('senderId', 'username');
    res.json(friendRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const respondToFriendRequest = async (req, res) => {
  try {
    const { requestId, response } = req.body;
    console.log("🚀 ~ file: friendController.js:42 ~ respondToFriendRequest ~ req.body:", req.body)

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    if (response === 'accept') {
      await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: friendRequest.receiver } });
      await User.findByIdAndUpdate(friendRequest.receiver, { $addToSet: { friends: friendRequest.sender } });
    }

    await FriendRequest.findByIdAndDelete(requestId);

    res.json({ message: 'Friend request processed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createFriendRequest, getFriendRequests, respondToFriendRequest };
