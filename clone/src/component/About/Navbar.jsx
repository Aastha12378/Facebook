import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ setActiveTab }) => {
    return (
        <>
            <div className="sidebar">
                <h3>About</h3>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/overview" onClick={() => setActiveTab('overview')}>
                            Overview
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/work" onClick={() => setActiveTab('work')}>
                            Work and education</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">Placed Lived</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">Contact and basic info</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">Family and relationships</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">Details about you</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">Life events</Link>
                    </li>
                </ul>

            </div>
        </>
    )
}

export default Navbar
