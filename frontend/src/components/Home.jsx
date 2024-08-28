import React, {lazy, Suspense } from 'react'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import Button from './Button'

const FeaturedProduct = lazy(() => import('./FeaturedProduct'))

function Home() {
  return (
    <main>
      <div className='min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-transparent'>
        <div id="hero-container" className='max-w-4xl mx-auto px-6 pb-32 flex flex-col md:text-center md:items-center'>
            <h1 className = "drop-shadow-sm text-4xl font-display font-semibold leading-snug mt-14 md:text-6xl md:mt-24">Your Online Marketplace for Everything</h1>
            <p className='drop-shadow-sm text-gray-800 text-lg mt-6 md:text-xl'>Discover a world of quality and convenience at EStore, where seamless shopping meets unbeatable value.</p>
            <div id = "btn-container" className='mt-12 flex flex-col sm:flex-row'>
              <Link to = "/products">
                <Button name = "Shop now"/>
              </Link>
            </div>
        </div>
          <Suspense fallback = {<Loading />}>
            <FeaturedProduct />
          </Suspense>
      </div>
    </main>
  )
}

export default Home