import React from 'react'
import "./Friends.scss"
import person from '../../img/person1.jpg'
import { Link } from 'react-router-dom'

const Friends = ({friends}) => {
  return (
    <>
      <div className="container-f mt-4">
      <h2>Friends</h2>
        <div className="justify-content-center">
          {friends?.length > 0 ? <h3>Your friends</h3> : ''}
          {friends?.length > 0 ? friends?.map((friend) => (
            <Link to={`/profile/${friend._id}`} key={friend._id} className="friend">
              <img src={friend?.profilePic ? `http://localhost:3001/images/${friend?.profilePic}` : person} className="friendImg" alt="person" />
              <span className='text-decoration-none'>{friend.username}</span>
            </Link>
          ))
            : <h5 style={{ textAlign: 'center' }}>You currently have no friends</h5>}
        </div>
      </div>
    </>
  )
}

export default Friends
