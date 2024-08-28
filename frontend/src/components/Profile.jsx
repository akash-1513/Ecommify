import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'



function Profile() {
    const {userData} = useSelector(state => state.auth)
    return <div className='flex justify-center items-center bg-gradient-to-br from-purple-50 via-orange-50 to-transparent p-4'>
        <div className='w-96 p-6 mt-14 shadow-lg bg-white rounded-md'>
            <h1 className='text-2xl text-center font-semibold md:text-3xl'>Profile</h1>
            <hr className='mt-3' />
            <div className='flex justify-center mt-2'>
                <img src={userData?.avatar.url} className='w-28 h-28 rounded-full' alt="" />
            </div>
            <div>
                <div className='mt-3'>
                    <label htmlFor='username' className='block text-base mb-2 text-gray-700'>Username</label>
                    <input name = "username" value = {userData?.username} type="text" id = "username" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='@username' disabled = {true}/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='fullName' className='block text-base mb-2 text-gray-700'>Full Name</label>
                    <input name = "fullName" value = {userData?.fullName} type="text" id = "fullName" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='@username' disabled = {true}/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='email' className='block text-base mb-2 text-gray-700'>Email</label>
                    <input name = "email" type="email" id = "email" value = {userData?.email} className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='Email' disabled = {true}/>
                </div>
                <div className='mt-3'>
                    <label htmlFor='joined' className='block text-base mb-2 text-gray-700'>Joined On</label>
                    <input name = "joined" type="text" id = "email" value = "15 Aug 2024" className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600 rounded-md' placeholder='Joined On' disabled = {true}/>
                </div>
                
                <div className='mt-4 flex flex-col'>
                <Link to = "/update-profile"><button className={`w-full flex justify-center items-center text-white rounded-md shadow-sm hover:opacity-90 bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle  text-[15px] uppercase shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none font-semibold disabled:opacity-50 disabled:shadow-none `}>Update Profile</button></Link>
                </div>

                <div className='mt-4 flex flex-col'>
                <Link to = "/orders"><button className={`w-full flex justify-center items-center text-white rounded-md shadow-sm hover:opacity-90 font-semibold bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle text-[15px]  uppercase shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none `}>My Orders</button></Link>
                </div>

                
                <div className='mt-4 flex flex-col'>
                <Link to = "/change-password"><button className={`w-full flex justify-center items-center text-white rounded-md shadow-sm hover:opacity-90 font-semibold bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle text-[15px] uppercase shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none `}>Change Password</button></Link>
                </div>
            </div>
        </div>
    </div>
}
export default Profile