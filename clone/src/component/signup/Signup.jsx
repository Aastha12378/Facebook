import React, { useState } from 'react'
import facebook from "../../img/facebook.webp"
import "../../style/component/Signin.scss"

const Signup = () => {

    // const [formData, setFormData] = useState({
    //     firstName: "", surname: "",
    //     email: "", password: "",
    //     day: "", month: "", year: "",
    //     gender: ""
    // });

    const [firstName, setFirstName] = useState("");
    const [surname, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [gender, setGender] = useState("");

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    //     console.log(name , value);
    // };

    // const handleDateChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    //     // console.log(name , value);
    // };

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log("Form submitted:", firstName, surname, email, password, day, month, year, gender);
        if (!firstName || !surname || !email || !password || !day || !month || !year || !gender) {
            console.log("All fields are required");
            return;
        }
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            const response = await fetch("http://localhost:4000/signup", {
                method: "POST",
                body: JSON.stringify({ firstName, surname, email, password, day, month, year, gender }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                window.location.href = '/login';
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);


    return (
        <>
            <div className="container">
                <div className='text-center'>
                    <img src={facebook} alt="facebook" width="25%" height="150px" />
                </div>

                <div className="row">
                    <div className="col-lg-5 m-auto">
                        <div className="card shadow">

                            <div className='text-center'>
                                <h2 className='fw-bold'>Create a new account</h2>
                                <p className='fs-5'>It's quick and easy.</p>
                            </div>
                            <hr />

                            <form onSubmit={handleSubmit} method='post' action='/signup'>
                                <div className="input-group mb-1">
                                    <input type="text" className="m-2 form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" aria-label="Username" aria-describedby="basic-addon1" required />
                                    <input type="text" className="m-2 form-control" value={surname} onChange={(e) => setSurName(e.target.value)} placeholder="Surname" aria-label="Username" aria-describedby="basic-addon1" required />
                                </div>

                                <div className="input-group mb-1">
                                    <input type="email" className="m-2 form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Username" aria-describedby="basic-addon1" required />
                                </div>

                                <div className="input-group mb-1">
                                    <input type="password" className="m-2 form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" autoComplete='on' aria-label="Username" aria-describedby="basic-addon1" required />
                                </div>

                                <div className="form-group">
                                    <label>Date of Birth:</label>
                                    <div className="input-group mb-1">
                                        <select className="m-2 form-control" name="day" value={day} onChange={(e) => setDay(e.target.value)} required>
                                            <option value="">Day</option>
                                            {days.map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                        <select className="m-2 form-control" name="month" value={month} onChange={(e) => setMonth(e.target.value)} required>
                                            <option value="">Month</option>
                                            {months.map((month) => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </select>
                                        <select className="m-2 form-control" name="year" value={year} onChange={(e) => setYear(e.target.value)} required>
                                            <option value="">Year</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Gender:</label>
                                    <div className="input-group" onChange={(e) => setGender(e.target.value)}>
                                        <label className="radio-label m-2  form-control">
                                            <input type="radio" name="gender" value="female" className="form-check-input" />
                                            Female
                                        </label>
                                        <label className="radio-label m-2  form-control">
                                            <input type="radio" name="gender" value="male" className="form-check-input" />
                                            Male
                                        </label>
                                        <label className="radio-label m-2  form-control">
                                            <input type="radio" name="gender" value="custom" className="form-check-input" />
                                            Custom
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button type='submit' className='btn btn-success px-5 fs-5'>Sign Up</button>
                                    <h5><a className="inline-block text-decoration-none" href="/login">
                                        Already have account?</a></h5>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
