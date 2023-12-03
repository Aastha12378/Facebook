const FriendRouter = require("express").Router();
const { createFriendRequest, getFriendRequests, respondToFriendRequest } = require('../controllers/friendController');
const verifyToken = require('../middleware/auth');

FriendRouter.post('/request',verifyToken, createFriendRequest);
FriendRouter.get('/request/:userId',verifyToken, getFriendRequests);
FriendRouter.post('/respond',verifyToken, respondToFriendRequest);
// FriendRouter.delete('/rejectRequest/:senderId', verifyToken, rejectFriendRequest);

module.exports = FriendRouter;
