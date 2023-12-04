import React from 'react'
import "./Home.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Posts from '../../components/posts/Posts'
import FriendRequestsPage from '../../components/Request/FriendRequestsPage'

const Home = () => {

  return (
    <>
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
