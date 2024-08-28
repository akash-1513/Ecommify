import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'sonner'

function Signup() {
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await axios.post("/api/v1/user/register", {
        fullName, username, email, password, avatar: file
      }, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      });

      setLoading(false)
      navigate("/login")
      toast.success("User register successfully")
    } catch(error) {
      toast.error(error.response.data.message || error.message)
      setLoading(false)

    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-transparent p-4'>
        <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
            <h1 className='text-2xl font-semibold md:text-3xl'>Signup</h1>
            <hr className='mt-3' />
            <form onSubmit = {handleSignup}>
                <div className='mt-3'>
                    <label htmlFor='fullname' className='block text-base mb-2 text-gray-700'>Full Name</label>
                    <input value = {fullName} onChange = {((e) => setFullName(e.target.value))} type="text" id = "fullname" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='Full name'/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='username' className='block text-base mb-2 text-gray-700'>Username</label>
                    <input value = {username} onChange={(e) => setUsername(e.target.value)} type="text" id = "username" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='@username'/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='email' className='block text-base mb-2 text-gray-700'>Email</label>
                    <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" id = "email" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='Email'/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='password' className='block text-base mb-2 text-gray-700'>Password</label>
                    <input value = {password} onChange={(e) => setPassword(e.target.value)} type="text" id = "password" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='Password'/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='avatar' className='block text-base mb-2 text-gray-700'>Avatar</label>
                    <input onChange = {(e) => setFile(e.target.files[0])} type="file" id = "avatar" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md'/>
                </div>
                <div className='mt-4 flex flex-col'>
                <button className={`flex justify-center font-semibold items-center text-white rounded-md shadow-sm hover:opacity-90 ${loading ? 'opacity-90' : ''} bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle text-[15px] uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none `}>
                    {!loading ? "Signup" : <img className = "w-11 px-2 text-center" src = "https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"></img>}
                  </button>
                </div>
                <div className='mt-3'>
                  <span>Already a member? </span> 
                  <Link to = "/login" className='text-primary font-semibold'>Login</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup