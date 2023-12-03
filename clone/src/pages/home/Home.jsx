import React from 'react'
import "./Home.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Posts from '../../components/posts/Posts'
import Friends from '../../components/friends/Friends'
import { AuthProvider } from '../../context/AuthContext'
import FriendRequestsPage from '../../components/Request/FriendRequestsPage'

const Home = () => {

  //  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQ1NGU2YWYzOWRmZmI1ODdkZDk4MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDA2MTUzOTh9.Ya_i2uDrgBdqzB1pRer7gbcVk_nkJ-uXW7NhEoefKZU"

  return (
    <>
      {/* <AuthProvider> */}
      <>
        <div className="wrapper">
          <Navbar />
          <div className='container'>
            <div className="row">
              <div className="col-lg-4">
                <Sidebar />
              </div>
              <div className="col-lg-4">
                <Posts />
              </div>
              <div className="col-lg-4">
                <FriendRequestsPage />
                <Friends />
              </div>
            </div>
          </div>
        </div>
      </>
      {/* </AuthProvider> */}
    </>
  )
}

export default Home
