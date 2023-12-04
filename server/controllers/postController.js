const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getUserPosts = async (req, res) => {
    // console.log(req.body);
    try {
        let userPosts = await Post.find({ userId: req.params.id }).populate({
            path: 'userId',
            model: 'User'
        });
        
        const postsWithComments = await Promise.all(userPosts.map(async (post) => {
            const comments = await Comment.find({ postId: post._id }).populate({
                path: 'userId',
                model: 'User'
            });
            return { post, comments };
        }));

        if (userPosts == false || userPosts.length <= 0) {
            throw new Error("No posts from this user");
        } else {
            return res.status(200).json(postsWithComments);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const createPost = async (req, res) => {
    try {
        const isEmpty = Object.values(req.body).some((v) => !v);
        if (isEmpty) {
            throw new Error("Fill all fields!");
        }

        const post = await Post.create({ ...req.body, userId: req.user.id });
        return res.status(201).json(post)
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        // console.log("🚀 ~ file: postController.js:43 ~ updatePost ~ post:", post)

        if (post.userId === req.body.userId) {
            const updatedPost = await Post.findByIdAndUpdate(
                req.body.userId,
                { $set: req.body },
                { new: true }
            );

            return res.status(200).json(updatedPost);
        } else {
            throw new Error("You can only update your own posts");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deletePost = async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    try {
        const post = await Post.findById(req.params.id);
        // console.log("🚀 ~ file: postController.js:64 ~ deletePost ~ post:", req.params.id)
    
        if (post.userId.toString() === req.user.id) {
            // console.log("post => ", post);
            await Post.deleteOne({ _id: req.params.id });
            return res.status(200).json({ msg: "Successfully deleted post" });
        } else {
            throw new Error("You can only delete your own posts");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error("No such post");
        }

        const isLikedByCurrentUser = post.likes.includes(req.user.id);
        if (isLikedByCurrentUser) {
            throw new Error("Can't like a post two times");
        } else {
            await Post.findByIdAndUpdate(
                req.params.postId,
                { $push: { likes: req.user.id } },
                { new: true }
            );
            return res.status(200).json({ msg: "Post has been successfully liked" });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const dislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error("No such post");
        }

        const isLikedByCurrentUser = post.likes.includes(req.user.id);
        if (isLikedByCurrentUser) {
            await Post.findByIdAndUpdate(
                req.params.postId,
                { $pull: { likes: req.user.id } },
                { new: true }
            );
            return res.status(200).json({ msg: "Post has been successfully liked" });
        } else {
            throw new Error("Can't dislike that you haven't liked");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getTimelinePosts = async (req, res) => {
    try {
    const currentUser = await User.findById(req.user.id);

    const userPosts = await Post.find({ userId: currentUser.id }).populate({
        path: 'userId',
        model: 'User'
    });
        const friendPosts = await Promise.all(
            [...currentUser.followings,...currentUser.followers].map((friendId) => {
                return Post.find({ userId: friendId }).populate({
                    path: 'userId',
                    model: 'User'
                })
            })
        );
        const postsWithComments = await Promise.all(userPosts.concat(...friendPosts).sort((a, b) => b.createdAt - a.createdAt)?.map(async (post) => {
            const comments = await Comment.find({ postId: post._id }).populate({
                path: 'userId',
                model: 'User'
            });
            return { post, comments };
        }));
        return res.json(postsWithComments)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getPost,
    getUserPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    getTimelinePosts
};