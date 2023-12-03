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

  // console.log(user._id === post?.userId);
  // console.log(user._id);
  // console.log(post?.userId);

  const [authorDetails, setAuthorDetails] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id))
  const [showDeleteModal, setShowDeleteModal] = useState(true)

  // console.log(user._id);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request('/user/find/' + post.userId, 'GET')
        setAuthorDetails(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [post.userId])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${post._id}`, 'GET')
        // console.log(data)
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchComments()
  }, [post._id])

  const handleLike = async () => {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    try {
      await request(`/post/likePost/${post._id}`, "PUT", headers)
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
      await request(`/post/dislikePost/${post?._id}`, "PUT", headers)
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
      const data = await request('/comment', 'POST', headers, { text: commentText, postId: post._id })
      console.log(data)
      setComments(prev => {
        if (prev.length === 0) return [data]
        return [data, ...prev]
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

      await request('/post/deletePost/' + post._id, 'DELETE', headers)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="post">

        <div className="top">
          <Link to={`/profile/${user._id}`} className="topLeft">
            <img src={user?.profilePic ? `http://localhost:3001/images/${user?.profilePic}` : person} alt="" className="postAuthorImg" />
            <div className="postDetails">
              <span>{authorDetails?.username}</span>
              <span className="date">
                {Format(post?.createdAt)}
              </span>
            </div>
          </Link>

          {user._id === post?.userId && <i className="fa-solid fa-gear" onClick={() => setShowDeleteModal(prev => !prev)}></i>}
          {/* {post._id === post?.userId && <i className="fa-solid fa-gear" onClick={() => setShowDeleteModal(prev => !prev)}></i>} */}
          {showDeleteModal && (
            <span className="deleteModal" onClick={handleDeletePost}>
              Delete post
            </span>
          )}
        </div>

        <p className="desc">
          {post?.desc}
        </p>

        <div className="postImgContainer">
          <img src={post.imageUrl ? `http://localhost:3001/images/${post.imageUrl}` : italy} alt="background" className="postImg" />
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
