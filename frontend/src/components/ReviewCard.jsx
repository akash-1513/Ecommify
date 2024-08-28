import React, {memo} from 'react'
import ReactStars from 'react-stars'

function ReviewCard({fullName, avatar, rating, description}) {
    console.log("Review rendered!")
  return (
    <div className='w-80 flex flex-col px-5 py-5 shadow-gray-400 shadow-sm rounded-md'>
        <div>
            <div className='flex items-center gap-2'>
                <img className = "w-10 h-10 rounded-full" src={avatar} alt="avatar" />
                <h1 className='font-medium'>{fullName}</h1>
            </div>
            <div className='flex gap-2 items-center'>
            <h2 className={`text-sm text-white px-1 ${rating >= 3 ? 'bg-green-500' : 'bg-red-500'} rounded-sm`}>{rating ? rating.toFixed(1) : 0} ★</h2>
                <ReactStars 
                    count={5} 
                    size={window.innerWidth < 600 ? 18 : 22} 
                    color1='gray' 
                    color2='black'
                    value={rating} 
                    half={true} 
                    edit={false} 
                />
            </div>
        </div>
        <div className='mt-2 text-gray-900'>
            <p className='text-left'>{description}</p>
        </div>
    </div>
  )
}

export default memo(ReviewCard)