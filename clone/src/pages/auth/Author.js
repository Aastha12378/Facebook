import React, { useState } from 'react'
import "./auth.scss"
import { useNavigate } from 'react-router-dom'
import { request } from '../../util/Request'

const Author = () => {

  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (isRegister) {
        if (username === '' || email === '' || password === '') {
          setError("Fill all fields!")
          setTimeout(() => {
            setError(false)
          }, 2500)
          return
        }

        const headers = { 'Content-Type': 'application/json' }
        const body = { username, email, password }
        const data = await request('/auth/register', 'POST', headers, body)

        console.log("🚀 ~ file: Author.js:32 ~ handleSubmit ~ data:", data)
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.others))

        navigate('/')
      } else {
        if (email === '' || password === '') {
          setError("Fill all fields!")
          setTimeout(() => {
            setError(false)
          }, 2500)
          return
        }

        const headers = { 'Content-Type': 'application/json' }
        const body = { email, password }
        const data = await request('/auth/login', 'POST', headers, body)
        console.log("🚀 ~ file: Author.js:52 ~ handleSubmit ~ data:", data)
        if (data.token) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data.others))

          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container-auth">
        <div className="wrapper-aut;">
          <div className="left-auth text-center">
            <h1>FaceBook</h1>
            <p>Connect with your close friends and relatives now</p>
          </div>

          <form onSubmit={handleSubmit} className="right-auth">
            {isRegister && <input type="text" placeholder='Type username...' onChange={(e) => setUsername(e.target.value)} />}
            <input type="email" name="email" placeholder='Type email...' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder='Type password...' onChange={(e) => setPassword(e.target.value)} />
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
    </>
  )
}

export default Author
