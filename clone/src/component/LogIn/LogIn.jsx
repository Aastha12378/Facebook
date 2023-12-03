import React, { useState } from 'react'
import facebook from "../../img/facebook.webp"

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", email, password);

        const token = localStorage.getItem('token');
        console.log(token);

        try {
            const response = await fetch("/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    alert(errorData.message);
                } else {
                    alert("An error occurred. Please try again later.");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="container">
                <div className='text-center'>
                    <img src={facebook} alt="facebook" width="25%" height="150px" />
                </div>

                <div className="row">
                    <div className="col-lg-5 m-auto">
                        <div className="card p-4 shadow">

                            <h2 className='text-center fw-light'>Log in to Facebook</h2>

                            <form onSubmit={handleSubmit} method='post'>
                                <div className="input-group mb-1">
                                    <input type="email" className="m-2 form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Username" aria-describedby="basic-addon1" required />
                                </div>

                                <div className="input-group mb-1">
                                    <input type="password" autoComplete='on' onChange={(e) => setPassword(e.target.value)} className="m-2 form-control" placeholder="password" aria-label="Username" aria-describedby="basic-addon1" required />
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary px-5 fs-5" type="button">Log in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogIn
