import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { logout } from '../store/authSlice'
import { toast } from 'sonner'

function AvatarDropdown() { 

    const server = "https://ecommify-backend.onrender.com"
    const [showMenu, setShowMenu] = useState(false)
    const {userData} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const handleLogout = async () => {
        try {
            await axios.post(`/api/v1/user/logout`)
            dispatch(logout())
            navigate("/login")
            toast.success("logged out successfully")
        } catch(error) {
            // Todo react toast
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(() => {
        setShowMenu(false)
    },[pathname])

    return (
        <div className='relative'>
            <img
                src={userData?.avatar.url}
                alt="avatar"
                className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                onClick = {() => setShowMenu(prev => !prev)}
            />
            <div className={`bg-white p-4 w-44 z-40 shadow-lg absolute -left-36 top-16 ${showMenu ? "" : "hidden"}`}>
                <ul className='flex flex-col gap-1'>
                    <Link to = "/profile"><li className='p-1 hover:bg-gray-200'>Profile</li></Link>
                    <li className='p-1 hover:bg-gray-200'><Link to = "/orders">Orders</Link></li>
                    <li className=''><button className = "bg-red-700 hover:opacity-90 text-white rounded-md p-1 w-full cursor-pointer" onClick = {handleLogout}>Logout</button></li>
                </ul> 
            </div>
        </div>

    )
}

export default AvatarDropdown   