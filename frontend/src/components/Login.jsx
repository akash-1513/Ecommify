import React, { useState } from 'react'
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { toast } from 'sonner';

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const server = "https://ecommify-aka9.onrender.com"

  const handleLogin = async (e) => {
    e.preventDefault() // Create FormData object
    // const formData = new FormData();
    // formData.append('username', username);
    // formData.append('password', password);
      try {
        setLoading(true);
        const {data} = await axios.post(`${server}/api/v1/user/login`, {username, password}, {
          headers: {
              'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        setLoading(false)
        dispatch(login({userData: data.user}))
        navigate("/")
        toast.success("Logged in successfully")
    } catch(error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return <div className='flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-transparent p-4'>
        <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
            <h1 className='text-2xl font-semibold md:text-3xl'>Login</h1>
            <hr className='mt-3' />
            <form onSubmit = {handleLogin}>
                <div className='mt-3'>
                    <label htmlFor='username' className='block text-base mb-2 text-gray-700'>Username</label>
                    <input name = "username" value = {username} onChange={(e) => setUsername(e.target.value)} type="text" id = "username" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='@username'/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='password' className='block text-base mb-2 text-gray-700'>Password</label>
                    <input name = "password" value = {password} onChange={(e) => setPassword(e.target.value)} type="password" id = "password" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='Password'/>
                </div>
                <div className='mt-4 flex flex-col'>
                  <button className={`flex font-semibold justify-center items-center text-white rounded-md shadow-sm hover:opacity-90 ${loading ? 'opacity-90' : ''} bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle text-[15px] uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none `}>
                    {!loading ? "Login" : <img className = "w-11 px-2 text-center" src = "https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"></img>}
                  </button>
                  
                </div>
                <div className='mt-3'>
                  <span>Not a member? </span> 
                  <Link to = "/signup" className='text-primary font-semibold'>Create an account</Link>
                </div>
            </form>
        </div>
    </div>
}

export default Login