import React from 'react';
import { Link } from 'react-router-dom';

const Friends = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="card">

            <div className="d-flex justify-content-between align-items-center">
              <h4 className='head fw-bold'>Friend Requests</h4>
              <form className="d-flex bg-light" role="search">
                <div className="input-group border text-warning rounded-0">
                  <button type="button" className="btn border-start-0">
                    <i className="fa-solid fa-magnifying-glass text-black"></i>
                  </button>
                  <input type="search" className="form-control border-0 bg-light"
                    placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                </div>
              </form> 
              <div className='d-flex text-primary'>
                <Link to="/find-friends" className='me-5'>Find Friends</Link>
              </div>
            </div>

            <div className='text-center p-4'>
              <h2>No Friend Requests to show</h2>
            </div>

          </div>
        </div>

        <div className="container py-3">
          <div className="card">

            <div className="d-flex justify-content-between align-items-center">
              <h4 className='head fw-bold'>Photos</h4>

              <div className='d-flex text-primary'>
                <Link to="/add-photos" className='me-3'>Add photos/videos</Link>
              </div>
            </div>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                  type="button" role="tab" aria-controls="pills-home" aria-selected="true">Albums</button>
              </li>
            </ul>

            <div className="box">
              {/* Add photo album items here */}
            </div>
            <Link to="/create-album" className='text-decoration-underline text-black fs-5'>Create Album</Link>

          </div>
        </div>

      </section>
    </>
  );
}

export default Friends;
