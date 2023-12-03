import React, { useState } from 'react';
import user from '../../img/user.png';
import "../../style/component/Concept.scss"

const Concept = () => {
    const [postText, setPostText] = useState('');

    const handleInputChange = (e) => {
        setPostText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Post Text:', postText);
    };

    return (
        <section>
            <div className="container py-3">
                <div className="card ">
                    <div className="d-flex align-items-center">
                        <img src={user} alt="User" className='img-fluid rounded-pill' width="10%" height="10%" />
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input type="text" placeholder="What's on your mind, Ash?" className="form-control" value={postText} onChange={handleInputChange} />
                                <button type="submit" className="btn btn-primary">Post</button>
                            </div>
                        </form>
                    </div>

                    <hr />

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <button className='bg-white d-flex border-0'>
                                    <h4><i className="fa-solid fa-video text-danger"></i></h4>
                                    <h4 className='text-secondary ms-2'>Live Video</h4>
                                </button>
                            </div>

                            <div className="col-lg-4">
                                <button className='bg-white d-flex border-0'>
                                    <h4><i className="fa-solid fa-image text-success"></i></h4>
                                    <h4 className='text-secondary ms-2'>Photo/Video</h4>
                                </button>
                            </div>

                            <div className="col-lg-4">
                                <button className='bg-white d-flex border-0'>
                                    <h4><i className="fa-regular fa-face-smile text-warning"></i></h4>
                                    <h4 className='text-secondary ms-2'>Feeling/Activity</h4>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Concept;
