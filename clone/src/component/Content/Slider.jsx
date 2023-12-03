import React from 'react'
// import { Link } from 'rea    ct-router-dom'
import "../../style/component/Slider.scss"
import About from '../About/About'
import Post from '../Post/Post'
import Friends from '../../components/friends/Friends'

const Slider = () => {
    return (
        <>
            <section className='container py-5'>
                <div className='py-5'>
                    <nav>
                        <ul className="nav nav-pills mb-3 pt-5" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                                    type="button" role="tab" aria-controls="pills-home" aria-selected="true">Post</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                                    type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                    About</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact"
                                    type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                                    Friends</button>
                            </li>
                        </ul>
                    </nav>
                    <hr />

                    <div className="tab-content fw-light" id="pills-tabContent">
                        <div className="tab-pane fade active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <Post />
                        </div>

                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <About />
                        </div>

                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                            <Friends />
                        </div>

                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default Slider
