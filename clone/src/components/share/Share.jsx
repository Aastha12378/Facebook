import React, { useState } from 'react'
import "./Share.scss"
import { request } from '../../util/Request'
import person from '../../img/person1.jpg'

const Share = () => {

  const [desc, setDesc] = useState("")
  const [photo, setPhoto] = useState("")
  
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));
  // console.log("🚀 ~ file: Share.jsx:13 ~ Share ~ userData:", userData)

  const handleCreatePost = async () => {
    try {
      let filename = null

      if (photo) {
        const formData = new FormData()
        filename = crypto.randomUUID() + photo.name;
        formData.append("imageUrl", filename)
        formData.append("photo", photo)
        await request('/upload', 'POST', {}, formData, true)
      } else {
        return
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const body = {
        imageUrl: filename,
        desc
      }
      // console.log(`body : ${body}`);

      await request('/post', 'POST', headers, body)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="share">
        <div className="shareTop">
        {/* <img src={friend?.profilePic ? `http://localhost:3001/images/${friend?.profilePic}` : person} className="friendImg" alt="person" /> */}
          <img src={userData?.profilePic ? `http://localhost:3001/images/${userData?.profilePic}` : person} alt='person' className='img-fluid' />
          <input type="text" placeholder='Share your opinion' onChange={(e) => setDesc(e.target.value)} />
          <button onClick={handleCreatePost}>POST</button>
        </div>

        <div className="shareBottom">
          <div className="item">
            Live Video
            <i class="fa-solid fa-video"></i>
          </div>
          <label htmlFor='photo' className="item">
            Photo
            <i class="fa-solid fa-image"></i>
          </label>
          <div className="item">
            Activity
            <i class="fa-solid fa-face-smile"></i>
          </div>
        </div>

        <input style={{ display: 'none' }} type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} />
        {
          photo && (
            <div className="photoContainer">
              <h5 className="closeIcon" onClick={() => setPhoto("")} > <i class="fa-solid fa-xmark"></i></h5>
              <img src={URL.createObjectURL(photo)} className="photo" alt="" />
            </div>
          )
        }
      </div>
    </>
  )
}

export default Share
