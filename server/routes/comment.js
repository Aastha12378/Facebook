const { getCommentsFromPost, deleteComment, toggleLike, createComment } = require('../controllers/commentController')
const verifyToken = require('../middleware/auth')
const commentRouter = require('express').Router()

commentRouter.get('/:postId', getCommentsFromPost)
commentRouter.post('/', verifyToken, createComment)
commentRouter.delete('/:commentId', verifyToken, deleteComment)
commentRouter.put('/toggleLike/:commentId', verifyToken, toggleLike)

module.exports = commentRouter