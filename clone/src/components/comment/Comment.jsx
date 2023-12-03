import React, { useEffect, useState } from 'react'
import person from '../../img/person1.jpg'
import { request } from '../../util/Request'
import "./Comment.scss"
import Format from '../format/Format'

const Comment = ({ comment }) => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))

  const [commentAuthor, setCommentAuthor] = useState("")
  const [isLiked, setIsLiked] = useState(comment.likes.includes(user._id))

  useEffect(() => {
    const fetchCommentAuthor = async () => {
      try {
        const data = await request(`/user/find/${comment.userId}`, 'GET')
        setCommentAuthor(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCommentAuthor()
  }, [comment.userId])

  const handleLikeComment = async () => {

    try {
      const headers = { 'Authorization': `Bearer ${token}` }

      await request(`/comment/toggleLike/${comment._id}`, 'PUT', headers)

      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className="comment">
        <div className="commentLeft">
          <img src={comment?.profilePic ? `http://localhost:3001/images/${comment?.profilePic}` : person} className="commentImg" alt='person' />
          <div className="commentDetails">
            <h4>{commentAuthor?.username}</h4>
            <span>{Format(comment.createdAt)}</span>
          </div>
          <div className="commentText">{comment.text}</div>
        </div>
        {isLiked ? <i className="fa-solid fa-heart" onClick={handleLikeComment} ></i> :
          <i className="fa-regular fa-heart" onClick={handleLikeComment} ></i>}

        {/* {isLiked ? <p onClick={handleLikeComment}><i className="fa-solid fa-heart"></i></p> :
          <p onClick={handleLikeComment} ><i className="fa-regular fa-heart"></i></p>} */}
      </div>
    </>
  )
}

export default Comment
