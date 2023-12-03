import React from 'react'
import logo from "../../img/logo.webp"
import { Link } from 'react-router-dom'
import "../../style/component/Navbar.scss"

const Navbar = () => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg shadow fixed-top bg-white">
                    <div className="container-fluid">
                        <img src={logo} alt="logo" className='img-fluid' width="50px" height="10px" />
                        <form className="d-flex" role="search">
                            <div className="input-group border text-warning rounded-0">
                                <button type="button" className="btn border-start-0">
                                    <i className="fa-solid fa-magnifying-glass text-black"></i>
                                </button>
                                <input type="search" className="form-control border-0"
                                    placeholder="Search Facebook" aria-label="Search" aria-describedby="search-addon" />
                            </div>
                        </form>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex justify-content-around fs-4" id="navbarSupportedContent">
                            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" title='Home' to="/main"><i className="fa-solid fa-house"></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#"><i className="fa-solid fa-user-group"></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#"><i className="fa-solid fa-users"></i></Link>
                                </li>
                            </ul>
                            <div className='d-flex'>
                                <Link className='user' title='Messenger'><i className="text-dark fa-brands fa-facebook-messenger"></i></Link>
                                <Link className='user' title='Notifications'><i className="text-dark fa-solid fa-bell"></i></Link>
                                <Link className='user' to="/" title='Account'><i className="text-dark fa-solid fa-user"></i></Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar
