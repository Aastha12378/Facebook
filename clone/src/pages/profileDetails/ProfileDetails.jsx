import React from 'react'
import "./ProfileDetails.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Profile from '../../components/profile/Profile'

const ProfileDetails = () => {

  

  return (
    <>
      <Navbar />
      <div className="main-p container">
        <Sidebar />
        <Profile  />
      </div>
    </>
  )
}

export default ProfileDetails
