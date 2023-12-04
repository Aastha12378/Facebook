import React, { useEffect, useState } from 'react';
import "./auth.scss";
import { useNavigate } from 'react-router-dom';
import { request } from '../../util/Request';

const Author = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
if(localStorage.getItem('token')){
  navigate("/")
}
  },[localStorage.getItem('token')])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (Object.values(formData).some(value => value === '')) {
          setError("Fill all fields!");
          setTimeout(() => {
            setError(false);
          }, 2500);
          return;
        }

        const { username, email, password } = formData;
        const headers = { 'Content-Type': 'application/json' };
        const body = { username, email, password };
        const data = await request('/auth/register', 'POST', headers, body);

         localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.others));

        navigate('/');
      } else {
        const { email, password } = formData;
        if (email === '' || password === '') {
          setError("Fill all fields!");
          setTimeout(() => {
            setError(false);
          }, 2500);
          return;
        }

        const headers = { 'Content-Type': 'application/json' };
        const body = { email, password };
        const data = await request('/auth/login', 'POST', headers, body);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.others));

          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-auth">
      <div className="wrapper-aut">
        <div className="left-auth text-center">
          <h1>FaceBook</h1>
          <p>Connect with your close friends and relatives now</p>
        </div>

        <form onSubmit={handleSubmit} className="right-auth">
          {isRegister && <input type="text" name="username" placeholder='Type username...' value={formData.username} onChange={handleChange} />}
          <input type="email" name="email" placeholder='Type email...' value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder='Type password...' value={formData.password} onChange={handleChange} />
          <button className="submitBtn" type="submit">
            {isRegister ? 'Register' : 'Login'}
          </button>
          {
            isRegister
              ? <p onClick={() => setIsRegister(prev => !prev)}>Already have an account? Login</p>
              : <p onClick={() => setIsRegister(prev => !prev)}>Don't have an account? Register</p>
          }
        </form>
        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Author;