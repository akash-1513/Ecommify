import React from 'react'
import { Link } from 'react-router-dom'

function SuccessPage() {
  return (
    <div className = 'bg-white fixed inset-0 p-3 z-50 flex flex-col justify-center items-center'>
        <img className='w-80' src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif" alt="" />
        <div className='flex justify-center items-center gap-3 flex-wrap'>
            <Link to = "/orders">
                <button className='px-9 py-2 bg-primary text-white hover:opacity-90'>View Orders</button>
            </Link>
            <Link to = "/">
                <button className='px-9 py-2 bg-primary text-white hover:opacity-90'>Return To Home</button>
            </Link>
        </div>
    </div>
  )
}

export default SuccessPage