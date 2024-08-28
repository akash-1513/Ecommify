import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import { toast } from 'sonner'

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleChangePassword = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.put('/api/v1/user/change-password', {oldPassword, newPassword}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false)
            navigate("/profile")
            toast.success("Password changed successfully")
        } catch(error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.message || error.message)
        }
    }
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-transparent p-4'>
        <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
            <h1 className='text-2xl font-semibold md:text-3xl'>Change Password</h1>
            <hr className='mt-3' />
            <form onSubmit = {handleChangePassword}>
                <div className='mt-3'>
                    <label htmlFor='oldPassword' className='block text-base mb-2 text-gray-700'>Old Password</label>
                    <input name = "oldPassword" value = {oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" id = "oldPassword" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='Old Password'/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='newPassword' className='block text-base mb-2 text-gray-700'>New Password</label>
                    <input name = "newPassword" value = {newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" id = "newPassword" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='New Password'/>
                </div>
                <div className='mt-4 flex flex-col'>
                <button className={`flex font-display justify-center items-center text-white rounded-md shadow-sm hover:opacity-90 ${loading ? 'opacity-90' : ''} bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-[15px] font-semibold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none `}>
                    {!loading ? "Change Password" : <img className = "w-11 px-2 text-center" src = "https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"></img>}
                  </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword