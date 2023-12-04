import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import { request } from '../../util/Request'
import { useParams } from 'react-router-dom'
import Share from '../share/Share'
import coverPicture from '../../img/italy.jpg'
import profilePicture from '../../img/person1.jpg'
import Post from '../post/Post'

const Profile = () => {

  const token = localStorage.getItem("token");

  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([])
  const [profileDetails, setProfileDetails] = useState("");
  const [user,setUser]=useState(JSON.parse(localStorage.getItem("user")))
  // const [coverPicFile, setCoverPicFile] = useState(null);
  // const [profilePicFile, setProfilePicFile] = useState(null);

  const BACKEND_URL = `http://localhost:3001/images/`

  useEffect(() => {
    console.log("--------")
    const fetchPosts = async () => {
      try {
        const posts = await request(`/post/find/userposts/${id}`, 'GET')
        if (typeof (posts) === 'object' && posts?.length > 0) setUserPosts(posts)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      const searchedUser = await request(`/user/find/${id}`, 'GET')
      setProfileDetails(searchedUser)

      const loginUser = await request(`/user/find/${user?._id}`, 'GET')
      setUser(loginUser)
    }
    fetchUserData()
  }, [])

  const handleSendRequest = async () => {
    try {
      const headers = {'Authorization': `Bearer ${token}`}
      let data = await request(`/user/follow/${id}`, "PUT", headers)
      if (data?.user) {
        setUser(data?.user)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleRejectRequest = async () => {
    try {
      const headers = {'Authorization': `Bearer ${token}`}
      let data = await request(`/user/reject-request/${id}`, "PUT", headers)
      if (data?.user) {
        setUser(data?.user)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnFollow=async()=>{
    try {
      const headers = {'Authorization': `Bearer ${token}`}
      let data = await request(`/user/unfollow/${id}`, "PUT", headers)
      if (data?.user) {
        setUser(data?.user)
      }
    } catch (error) {
      console.error(error)
    }
  }

  console.log(user,id)
  return (
    <>
      <div className="container-p">
        <div className="wrapper-p">
          <div className="top-p">

            {/* <img src={coverPicFile} alt="Example" className="profilePicture"  />
            <button onClick={handleUpdateImages}>Change Image</button> */}

            <div className="cover-container">
              <img src={profileDetails?.coverPic ? BACKEND_URL + profileDetails?.coverPic : coverPicture}
                alt='cover' className="coverPicture" />
              {/* <div className="inputBox">
                <label htmlFor='pfp'><i class="fa-solid fa-camera-retro"></i></label>
                <input style={{ display: 'none' }} type="file" id='pfp' onChange={handleCoverPicChange} />
              </div> */}
            </div>

            <img src={profileDetails?.profilePic ? BACKEND_URL + profileDetails?.profilePic : profilePicture}
              alt='cover' className="profilePicture" />
            {/* <div className="inputBox">
              <label htmlFor='pfp'><i class="fa-solid fa-camera-retro"></i></label>
              <input style={{ display: 'none' }} type="file" id='pfp' onChange={handleCoverPicChange} />
            </div>
            <button onClick={handleUpdateImages}>Update Images</button> */}

            <div className="profileData">
              <h2 className="username">{profileDetails?.username}</h2>
              {id !== user?._id && (
                <>
                {(user?.followers?.includes(id)||user?.followings?.includes(id))
                ?<button className="followBtn" onClick={handleUnFollow}>Unfollow</button>
                :user?.sendingReq?.includes(id)
                ?<button className="followBtn" onClick={handleRejectRequest}>Requested</button>
                :<button className="followBtn" onClick={handleSendRequest}>Follow</button>
                }
                </>
              )}
            </div>

            {id === user?._id && (
              <div><Share /></div>
            )}

            <div className="posts-p">
              {userPosts?.length>0
              ?userPosts?.map((post) => (
                <Post key={post._id} post={post} />
              ))
              :<h3>No post uploaded!</h3>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
