import React, { useState } from 'react'
import "./UpdatedProfile.scss"
import Navbar from '../../components/navbar/Navbar'
import { request } from '../../util/Request'
import { useNavigate } from 'react-router-dom'

const UpdatedProfile = () => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [profilePic, setProfilePic] = useState(null)
  const [coverPic, setCoverPic] = useState(null)

  const handleUpdate = async (e) => {
    e.preventDefault()

    const body = {
        username,
        email
    }

    try {
        let profilePicName = null
        let coverPicName = null

        if (profilePic) {
            profilePicName = crypto.randomUUID() + profilePic
            const formData = new FormData()
            formData.append("imageUrl", profilePicName)
            formData.append("photo", profilePic)
            await request(`/upload`, 'POST', {}, formData, true)
            body.profilePic = profilePicName
        }

        if (coverPic) {
            coverPicName = crypto.randomUUID() + coverPicName
            const formData = new FormData()
            formData.append("imageUrl", coverPicName)
            formData.append("photo", coverPic)
            await request(`/upload`, 'POST', {}, formData, true)
            body.coverPic = coverPicName
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const data = await request(`/user/update/${user._id}`, 'PUT', headers, body)

        console.log("🚀 ~ file: UpdatedProfile.jsx:55 ~ handleUpdate ~ data:", data)
        navigate(`/profile/${user._id}`)
    } catch (error) {
        console.error(error)
    }
}

  return (
    <>
      <Navbar />
      <div className="container-u">
        <div className="wrapper-u">
          <form className="form" onSubmit={handleUpdate}>
            <h2>
              Update Profile
            </h2>
            <div className="inputBox">
              <label htmlFor='username'>Username</label>
              <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor='email'>Email</label>
              <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor='pfp'>Profile picture </label>
              <input style={{ display: 'one' }} type="file" id='pfp' onChange={(e) => setProfilePic(e.target.files[0])} />
            </div>
            <div clas="inputBox">
              <label htmlFor='coverPic'>Cover picture </label>
              <input style={{ display: 'one' }} type="file" id='coverPic' onChange={(e) => setCoverPic(e.target.files[0])} />
            </div>
            <button className="submitBtn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdatedProfile
