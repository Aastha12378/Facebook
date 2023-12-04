import React, { useState } from 'react'
import "./Share.scss"
import { request } from '../../util/Request'
import person from '../../img/person1.jpg'
import Modal from 'react-modal';

const Share = () => {

  const [desc, setDesc] = useState("")
  const [photo, setPhoto] = useState("")
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));

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
        'Authorization': `Bearer ${localStorage.getItem("token")}`
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
          <img src={userData?.profilePic ? `http://localhost:3001/images/${userData?.profilePic}` : person} alt='person' className='img-fluid' />
          <input type="text" placeholder='Share your opinion' onChange={(e) => setDesc(e.target.value)} />
          <button type="button" class="btn btn-info btn-lg" onClick={() => setIsOpen(true)}>Post</button>
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
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          }
        }}
      >
      <div className='wrapper'>
      <div className='d-flex flex-column'>
        <label>Upload post</label>
        <input type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} />
        {
          photo && (
            <div className="photoContainer">
              <h5 className="closeIcon" onClick={() => setPhoto("")} ><i class="fa fa-close"/></h5>
              <img src={URL.createObjectURL(photo)} className="photo" alt="" />
            </div>
          )
        }
        </div>
        <div className='d-flex flex-column'>
        <label>Description:</label>
        <textarea rows="4" cols="50" onChange={(e) => setDesc(e.target.value)}></textarea>
        </div>
        <button onClick={handleCreatePost}>Post</button>
        </div>
      </Modal>
    </>
  )
}

export default Share
