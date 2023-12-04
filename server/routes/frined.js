const FriendRouter = require("express").Router();
const { createFriendRequest, getFriendRequests, respondToFriendRequest } = require('../controllers/friendController');
const verifyToken = require('../middleware/auth');

FriendRouter.post('/request/:userId',verifyToken, createFriendRequest);
FriendRouter.get('/request/:userId',verifyToken, getFriendRequests);
FriendRouter.put('/respond/:requestId/:response',verifyToken, respondToFriendRequest);

module.exports = FriendRouter;
