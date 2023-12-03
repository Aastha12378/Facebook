import React, { useState } from 'react';
import user from "../../img/user.png";
import cameraIcon from "../../img/camera-icon.png";
import "../../style/component/Content.scss";

const Content = () => {

    const [coverPhoto, setCoverPhoto] = useState(null);
    // console.log(coverPhoto);

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        // console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setCoverPhoto(null);
        }
    };

    return (
        <>
            <section className='container'>
                <div className='content'>

                    {/* <div className='cover-photo-container'>
                        {coverPhoto ? (
                            <img src={coverPhoto} alt='Cover Photo' className='cover-photo' />
                        ) : (
                            <div className='cover-photo-placeholder'>
                                <img src={cameraIcon} alt='Camera Icon' className='camera-icon' width="50px" height="50px" />
                                <p>Upload Cover Photo</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverPhotoChange}
                            className='file-input'
                        />
                    </div> */}

                    {/* User Info */}
                    <div className="row user-info top-0">
                        <div className="col-lg-4">
                            <div className="user-left ms-5">
                                <img src={user} alt='User Avatar' className='user-avatar ms-5' />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="user-center">
                                <h1>Ash Patel</h1>

                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="user-right">
                                <button className='btn btn-primary'>
                                    <div className="d-flex">
                                        <h5><i className="fa-solid fa-plus"></i></h5>
                                        <h5 className='ms-2'>Add a Story</h5>
                                    </div>
                                </button>
                                <button className='btn btn-primary'>
                                    <div className="d-flex">
                                        <h5><i className="fa-solid fa-pen"></i></h5>
                                        <h5 className='ms-2'>Edit Profile</h5>
                                    </div>
                                </button>
                                <button className='btn btn-primary'><i className="fa-solid fa-chevron-down"></i></button>
                            </div>
                        </div>
                    </div>


                    {/* <div className="user-posts">
                        Render user posts
                    </div> */}

                </div>
            </section>
        </>
    );
};

export default Content;



// import React from 'react'
// // import bg from "../../img/bg.webp"
// import user from "../../img/user.png"
// import "../../style/component/Content.scss"

// const Content = () => {
//     return (
//         <>
//             <section className='container'>
//                 <div className='content'>
//                     <div className="row user-info top-0">
//                         <div className="col-lg-4">
//                             <div className="user-left ms-5">
//                                 <img src={user} alt='User Avatar' className='user-avatar ms-5' />
//                             </div>
//                         </div>
//                         <div className="col-lg-4">
//                             <div className="user-center">
//                                 <h1>Ash Patel</h1>
//                             </div>
//                         </div>
//                         <div className="col-lg-4 ">
//                             <div className="user-right">
//                                 <button className='btn btn-primary'>
//                                     <div className="d-flex">
//                                         <h5><i class="fa-solid fa-plus"></i></h5>
//                                         <h5 className='ms-2'>Add a Story</h5>
//                                     </div>
//                                 </button>
//                                 <button className='btn btn-primary'>
//                                     <div className="d-flex">
//                                         <h5><i class="fa-solid fa-pen"></i></h5>
//                                         <h5 className='ms-2'>Edit profile</h5>
//                                     </div>
//                                 </button>
//                                 <button className='btn btn-primary'>
//                                     <i class="fa-solid fa-chevron-down"></i></button>
//                             </div>
//                         </div>
//                     </div>
//                     {/* <div className="user-info">
//                         <div className="user-left">
//                             <img src={user} alt='User Avatar' className='user-avatar' />
//                         </div>
//                         <div className="user-center">
//                             <h1>Ash Patel</h1>
//                         </div>
//                         <div className="user-right">
//                             <button className='btn btn-primary'>
//                                 <div className="d-flex">
//                                     <h5><i class="fa-solid fa-plus"></i></h5>
//                                     <h5 className='ms-2'>Add a Story</h5>
//                                 </div>
//                             </button>
//                             <button className='btn btn-primary'>
//                                 <div className="d-flex">
//                                     <h5><i class="fa-solid fa-pen"></i></h5>
//                                     <h5 className='ms-2'>Edit profile</h5>
//                                 </div>
//                             </button>
//                             <button className='btn btn-primary'><i class="fa-solid fa-chevron-down"></i></button>
//                         </div>
//                     </div> */}
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Content