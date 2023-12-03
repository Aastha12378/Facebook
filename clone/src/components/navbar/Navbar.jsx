import React, { useState } from 'react'
import "./Navbar.scss"
import logo from "../../img/logo.webp"
import { Link, useNavigate } from 'react-router-dom'
import person from '../../img/person1.jpg'
import { request } from '../../util/Request'

const Navbar = () => {

  const userData = JSON.parse(localStorage.getItem("user"));

  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      setLoading(true);

      let response;

      if (query.trim() === '') {
        response = await request(`/user/findAll`, "GET");
      } else {
         response = await request("/user/searchFriend/"+query, "GET",{ 'Authorization': `Bearer ${localStorage.getItem("token")}` })
      }
        console.log("🚀 ~ file: Navbar.jsx:29 ~ handleSearch ~ response:", response)

      // const users = await response.json();
      if(response?.users?.length>0)setSearchResults(response.users);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/auth')
  }
  return (
    <>
      <div className="container-fluid p-0">
        <div className="wrapper-nav">

          {/* <nav className="navbar navbar-expand-lg shadow fixed-top bg-white"> */}
          <div className="container d-flex justify-content-between">
            <div className="left d-flex">
              <Link to="/">
                <img src={logo} alt="logo" className='img-fluid' width="60px" />
              </Link>
            </div>

            <div className="right">
              {/* <form className='searchForm'>
                <input type="text" placeholder='Search Profile...' />
                <div className="searchIcon">
                  <i className="fa-solid fa-magnifying-glass text-black"></i>
                </div>
              </form> */}
              <form className="searchForm">
                <input type="text" placeholder="Search Profile..." value={query}
                  onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyPress} />

                <div className="searchIcon">
                  <i className="fa-solid fa-magnifying-glass text-black"></i>
                </div>
              </form>
              {searchResults.length > 0 && (
                <div className="dropdown">
                  <div className="dropdown-content">
                    {searchResults.map((user) => (
                      <div key={user._id} onClick={() => handleProfileClick(user._id)}>
                        {user.username}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <img src={userData?.profilePic ? `http://localhost:3001/images/` + userData?.profilePic : person} className="personImg img-fluid" alt='person' onClick={toggleModal} />
              {showModal && (
                <div className="modal">
                  <span onClick={handleLogout} className="logout">logout</span>
                  <Link to={`/updateProfile/${userData?._id}`} className="updateProfile">Update Profile</Link>
                </div>
              )}

            </div>
          </div>
          {/* </nav> */}
        </div>
      </div>
    </>
  )
}

export default Navbar
