import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import { request } from '../../util/Request'
import { useParams } from 'react-router-dom'
import Share from '../share/Share'
import coverPicture from '../../img/italy.jpg'
import profilePicture from '../../img/person1.jpg'
import Post from '../post/Post'

const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([])
  const [isFollowed, setIsFollowed] = useState(user.followings.includes(id))
  const [profileDetails, setProfileDetails] = useState("")
  const [coverPicFile, setCoverPicFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  const BACKEND_URL = `http://localhost:3001/images/`

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await request(`/post/find/userposts/${id}`, 'GET')
        if (typeof (posts) === 'object' && posts?.length > 0) setUserPosts(posts)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [id])

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await request(`/user/find/${id}`, 'GET')
      setProfileDetails(user)
    }
    fetchUserData()
  }, [id])

  const handleFollow = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      }

      if (user.followings.includes(id)) {
        await request(`/user/unfollow/${id}`, "PUT", headers)
      } else {
        await request(`/user/follow/${id}`, "PUT", headers)
      }

      setIsFollowed(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCoverPicChange = (e) => {
    setCoverPicFile(e.target.files[0].name);
  }

  const handleProfilePicChange = (e) => {
    setProfilePicFile(e.target.files[0].name);
  }

  const handleUpdateImages = async () => {
    try {
      const formData = new FormData();

      if (coverPicFile) {
        formData.append('coverPic', coverPicFile);
      }

      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      await request(`/user/update/${id}`, {
        method: 'PUT',
        headers,
        body: formData,
      });

      const updatedUser = await request(`/user/find/${id}`, 'GET');
      setProfileDetails(updatedUser);
      console.log("🚀 ~ file: Profile.jsx:97 ~ handleUpdateImages ~ updatedUser:", updatedUser)

      setCoverPicFile(null);
      setProfilePicFile(null);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(userPosts)
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
              {id !== user._id && (
                <button className="followBtn" onClick={handleFollow}>{user.followings.includes(id) ? "Followed" : "Follow"}</button>
              )}
            </div>

            {id === user._id && (
              <div><Share /></div>
            )}

            <div className="posts-p">
              {userPosts?.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
