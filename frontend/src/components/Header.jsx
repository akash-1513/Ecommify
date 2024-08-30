import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector} from 'react-redux'
import AvatarDropdown from './AvatarDropdown'
import { useLocation } from 'react-router-dom'

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const {status} = useSelector(state => state.auth)
  const {count} = useSelector(state => state.cart)
  const location = useLocation()

  const path = location.pathname

  useEffect(() => {
    setShowMenu(false);
  }, [path])

  return (
    <nav className='p-3 flex flex-col justify-center shadow-sm gap-5'>
      <div className='flex justify-between items-center'>
        <Link to = "/" className='flex gap-2 items-center'>
          <img className='object-cover max-w-16 max-h-16' src="https://i.pinimg.com/originals/66/f7/72/66f77296282b5ab7c2780724802614c0.png" alt="" />
          <span className='text-xl drop-shadow-md font-bold font-display md:text-2xl'>eCommify</span>
        </Link>
        <div id = "nav-menu" className='hidden md:flex gap-12 text-'>
          <Link to = "/" className='text-lg hover:text-primary'>Home</Link>
          <Link to = "/contact" className='text-lg hover:text-primary'>Contact</Link>
          <Link to = "/products" className='text-lg hover:text-primary'>All Products</Link>
        </div>
      

        {!status ? <div className='hidden md:flex gap-3'>
          <Link to = "/cart" className='relative px-2'>
            <i class="fa-solid fa-bag-shopping fa-solid text-2xl md:text-3xl hover:opacity-90"></i>
            <span className='absolute top-3 left-0 border border-gray-50 bg-red-600 text-white px-2 rounded-full flex justify-center items-center md:left-5'>{count}</span>
          </Link>
          <Link to = "/login">
              <button className='flex items-center gap-2 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600'>
                <i class="fa-solid fa-right-to-bracket"></i>
                <span>Login</span>
              </button>
            </Link>
            <Link to = "/signup">
              <button className='flex items-center gap-2 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600'>
                <i class="fa-solid fa-user"></i>
                <span>Sign up</span>
              </button>
          </Link>
        </div> : (
                  // Icon 
                  <div className='flex gap-7 items-center'>
                    <Link to = "/cart" className='relative'>
                      <i class="text-green-600 fa-solid fa-bag-shopping fa-solid text-2xl md:text-3xl hover:opacity-90"></i>
                      <span className='absolute top-4 left-4 border border-gray-50 bg-red-600 text-white px-2 rounded-full flex justify-center items-center md:left-5'>{count}</span>
                    </Link>
                    <AvatarDropdown />
                    <button className='p-2 md:hidden' onClick={() => setShowMenu(prev => !prev)}>
                      <i className="fa-solid fa-bars"></i>
                    </button>
                  </div>
        )}
        {!status && <button className='p-2 md:hidden' onClick={() => setShowMenu(prev => !prev)}>
        <i className="fa-solid fa-bars"></i>
        </button>}
      </div>
      <div className = {`bg-white fixed inset-0 p-3 z-50 md:hidden ${!showMenu ? "hidden" : ""}`}>
        <div id = "nav-menu" className='flex justify-between '>
          <Link to = "/" className='flex gap-2 items-center'>
            <img className='object-cover max-w-12 max-h-12 ' src="" alt="" />
            <span className='text-xl font-bold font-display drop-shadow-md'>eCommify</span>
          </Link>
          <button className='p-2 md-hidden' onClick={() => setShowMenu(prev => !prev)}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className='mt-6'>
          <Link to = "/" className='font-medium m-3 p-3 hover:bg-gray-100 block rounded-lg'>Home</Link>
          <Link to = "/contact" className='font-medium m-3 p-3 hover:bg-gray-100 block rounded-lg'>Contact</Link>
          <Link to = "/products" className='font-medium m-3 p-3 hover:bg-gray-100 block rounded-lg'>All Products</Link>
          <div className='h-[1px] bg-gray-300'></div>
          {!status && (<div className='flex gap-5 mt-4'>
            <Link to = "/login">
              <button className='flex items-center gap-2 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600'>
                <i class="fa-solid fa-right-to-bracket"></i>
                <span>Login</span>
              </button>
            </Link>
            <Link to = "/signup">
              <button className='flex items-center gap-2 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600'>
                <i class="fa-solid fa-user"></i>
                <span>Sign up</span>
              </button>
            </Link>
            <Link to = "/cart" className='relative'>
                <i className="fa-solid text-green-600 fa-bag-shopping fa-solid text-2xl md:text-3xl hover:opacity-90"></i>
                {/* <span className='absolute top-4 left-4 bg-red-600 text-white px-2 rounded-full flex justify-center items-center md:left-5'>{count}</span> */}
            </Link>
            {/* Todo show avatar button */}
          </div>)}
        </div>
      </div>
    </nav>
  )
}

export default Header