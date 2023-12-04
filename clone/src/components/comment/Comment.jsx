import React, { useEffect, useState } from 'react'
import person from '../../img/person1.jpg'
import { request } from '../../util/Request'
import "./Comment.scss"
import Format from '../format/Format'

const Comment = ({ comment }) => {
console.log("🚀 ~ file: Comment.jsx:8 ~ Comment ~ comment:", comment)

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))

  const [isLiked, setIsLiked] = useState(comment.likes.includes(user._id))
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
          <img src={comment.userId?.profilePic ? `http://localhost:3001/images/${comment.userId?.profilePic}` : person} className="commentImg" alt='person' />
          <div className="commentDetails">
            <h4>{comment.userId?.username}</h4>
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
