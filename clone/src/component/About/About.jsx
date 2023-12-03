import React, { useState } from 'react'
import "../../style/component/About.scss"
import Overview from './Overview'
import Work from './Work'
import Navbar from './Navbar'

const About = () => {

  const [activeTab, setActiveTab] = useState('work');
  // console.log(activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'work':
        return <Work />;
      case 'live':
        return <Work />;

      default:
        return null;
    }
  };

  return (
    <>
      {/* <div className="container about-container">
        <div className="row">
          <div className="col-lg-3">
            <Navbar setActiveTab={setActiveTab} />
          </div>
          <div className="col-lg-9">
            <div className="content">
              <div className="card">

                <div className="d-flex justify-content-between">
                  <h3>Photos</h3>
                  <Link>Add Photos/Videos</Link>
                </div>

                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                      type="button" role="tab" aria-controls="pills-home" aria-selected="true">Albums</button>
                  </li>
                </ul>

                <div className="box">

                </div>
                <Link className='text-decoration-underline text-black fs-5'>Create Album</Link>

              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container about-container">
        <div className="row">
          <div className="col-lg-3">
            <Navbar setActiveTab={setActiveTab} />
          </div>
          <div className="col-lg-9">
            <div className="content">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default About
