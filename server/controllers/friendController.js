const User = require('../models/User');
const FriendRequest = require('../models/Friend');

const createFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const recipientId = req.params.userId;

    const existingRequest = await FriendRequest.findOne({ senderId, recipientId });
    console.log(existingRequest);

    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent.' });
    }

    const friendRequest = new FriendRequest({
      senderId,
      recipientId,
      status: 'pending',
    });

    await friendRequest.save();

    res.status(201).json({ message: 'Friend request sent successfully.' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.user.id;
    // console.log("🚀 ~ file: friendController.js:34 ~ getFriendRequests ~ userId:", req.user.id)

    const friendRequests = await FriendRequest.find({ recipientId: userId }).populate('senderId', 'username');
    // console.log("🚀 ~ file: friendController.js:37 ~ getFriendRequests ~ friendRequests:", friendRequests)
    res.json(friendRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const respondToFriendRequest = async (req, res) => {
  try {
    const response = req.params.response;
    const requestId = req.params.requestId;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found.' });
    }

    if (friendRequest.recipientId !== req.user._id) {
      return res.status(403).json({ error: 'Permission denied.' });
    }

    if (response === 'accept') {
      friendRequest.status = 'accepted';
    } else if (response === 'reject') {
      friendRequest.status = 'rejected';
    } else {
      return res.status(400).json({ error: 'Invalid response.' });
    }

    await friendRequest.save();

    res.status(200).json({ message: 'Friend request responded successfully.' });
  } catch (error) {
    console.error('Error responding to friend request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createFriendRequest, getFriendRequests, respondToFriendRequest };
