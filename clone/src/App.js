import React from 'react'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { Navigate, Route, Routes, } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Author from './pages/auth/Author'
import ProfileDetails from './pages/profileDetails/ProfileDetails.jsx'
import UpdatedProfile from './pages/updatedProfile/UpdatedProfile.jsx'
import FriendRequestsPage from './components/Request/FriendRequestsPage.jsx'

const App = () => {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route path='/' element={token?<Home />: <Navigate to='/auth'/>} />
      <Route path='/profile/:id' element={token?<ProfileDetails />:<Navigate to='/auth'/>} />
      <Route path='/updateProfile/:id' element={token?<UpdatedProfile />:<Navigate to='/auth'/>} />
      <Route path='/auth' element={<Author />} />
      <Route path='/friends-requests' element={token?<FriendRequestsPage />:<Navigate to='/auth'/>} />
      </Routes>
  )
}

export default App
