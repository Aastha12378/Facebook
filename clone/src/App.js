import React from 'react'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Author from './pages/auth/Author'
import ProfileDetails from './pages/profileDetails/ProfileDetails.jsx'
import UpdatedProfile from './pages/updatedProfile/UpdatedProfile.jsx'
import FriendRequestsPage from './components/Request/FriendRequestsPage.jsx'

const App = () => {

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQwNzI1YWUyYWI2OWFjMTMwYmQ1NiIsInVzZXJuYW1lIjoidXNlciIsImlhdCI6MTcwMDU5NTQ5M30.NlMbj8NmMkdaoIQYq4Fwe1Ccaw6CIA384q5Yu-gp10w"

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id' element={<ProfileDetails />} />
          <Route path='/updateProfile/:id' element={<UpdatedProfile />} />
          <Route path='/auth' element={<Author />} />
          <Route path='/friends-requests' element={<FriendRequestsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
