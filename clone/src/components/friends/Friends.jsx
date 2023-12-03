import React, { useEffect, useState } from 'react'
import "./Friends.scss"
import { request } from '../../util/Request'
import person from '../../img/person1.jpg'
import { Link } from 'react-router-dom'

const Friends = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await request(`/user/find/userfriends/${user._id}`, "GET")
      // console.log("🚀 ~ file: Friends.jsx:15 ~ fetchFriends ~ friends:", friends)
      setFriends(friends)
    }
    fetchFriends()
  }, [user._id])


  return (

    <>
      <div className="container-f">
        <div className="wrapper-f">
          {friends?.length > 0 ? <h3>Your friends</h3> : ''}
          {friends?.length > 0 ? friends?.map((friend) => (
            <Link to={`/profile/${friend._id}`} key={friend._id} className="friend">
              <img src={friend?.profilePic ? `http://localhost:3001/images/${friend?.profilePic}` : person} className="friendImg" alt="person" />
              <span className='text-decoration-none'>{friend.username}</span>
            </Link>
          ))
            : <h3 style={{ textAlign: 'center' }}>You currently have no friends</h3>}
        </div>
      </div>
    </>
  )
}

export default Friends
