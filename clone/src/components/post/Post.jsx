import React, { useEffect, useState } from 'react'
import "./Post.scss"
import { request } from '../../util/Request'
import { Link } from 'react-router-dom'
import person from '../../img/person1.jpg'
import italy from '../../img/italy.jpg'
import Comment from '../comment/Comment'
import Format from '../format/Format'

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")
  const [isLiked, setIsLiked] = useState(post?.post?.likes?.includes(user._id))
  const [showDeleteModal, setShowDeleteModal] = useState(true)

  useEffect(() => {
    setComments(post?.comments)

  }, [post?.comments])

  const handleLike = async () => {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    try {
      await request(`/post/likePost/${post?.post._id}`, "PUT", headers)
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDislike = async () => {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    try {
      await request(`/post/dislikePost/${post?.post?._id}`, "PUT", headers)
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      const data = await request('/comment', 'POST', headers, { text: commentText, postId: post?.post._id })
      console.log(data)
      setComments(prev => {
        if (prev.length === 0) return [{...data.createdComment,userId:data?.userId}]
        return [ ...prev,{...data.createdComment,userId:data?.userId}]
      })

      setCommentText("")
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeletePost = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      await request('/post/deletePost/' + post?.post._id, 'DELETE', headers)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="post">

        <div className="top">
          <Link to={`/profile/${post?.post?.userId?._id}`} className="topLeft">
            <img src={post?.post.userId?.profilePic ? `http://localhost:3001/images/${post?.post.userId?.profilePic}` : person} alt="" className="postAuthorImg" />
            <div className="postDetails">
              <span>{post?.post.userId?.username}</span>
              <span className="date">
                {Format(post?.post?.createdAt)}
              </span>
            </div>
          </Link>

          {user._id === post?.post?.userId?._id && <i className="fa-solid fa-gear" onClick={() => setShowDeleteModal(prev => !prev)}></i>}
          {/* {post._id === post?.userId && <i className="fa-solid fa-gear" onClick={() => setShowDeleteModal(prev => !prev)}></i>} */}
          {user._id === post?.post?.userId?._id && showDeleteModal && (
            <span className="deleteModal" onClick={handleDeletePost}>
              Delete post
            </span>
          )}
        </div>

        <p className="desc">
          {post?.post?.desc}
        </p>

        <div className="postImgContainer">
          <img src={post?.post.imageUrl ? `http://localhost:3001/images/${post?.post.imageUrl}` : italy} alt="background" className="postImg" />
        </div>

        <div className="actions">
          {
            !isLiked &&
            <span className="action" onClick={handleLike}>
              Like <i class="fa-solid fa-thumbs-up"></i>
            </span>
          }
          {isLiked &&
            <span className="action" onClick={handleDislike}>
              Liked <i class="fa-solid fa-heart"></i>
            </span>
          }
          <span className="action" onClick={() => setShowComments(prev => !prev)}>
            Comment <i class="fa-solid fa-comments"></i>
          </span>
          <span className="action">
            Share <i class="fa-solid fa-share"></i>
          </span>
        </div>

        {showComments &&
          <>
            <div className="comments">
              {comments?.length > 0 ? comments?.map((comment) => (
                <Comment comment={comment} key={comment._id} />
              )) : <h3 style={{ padding: '1.25rem' }}>No comments yet.</h3>}
            </div>
            <form className="commentSection" onSubmit={handleComment}>
              <textarea value={commentText} type="text" placeholder='Type comment...' onChange={(e) => setCommentText(e.target.value)} />
              <button type="submit">Post</button>
            </form>
          </>
        }

      </div>
    </>
  )
}

export default Post
