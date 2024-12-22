import React from 'react'
import user from '../../assets/user.png'
import RatingStars from './RatingStars'

function ReviewCard(props) {
  const { review } = props

  return (
    <div className='flex flex-col items-center border-2 p-6 m-4'>
      <img src={user} alt='' width={'15%'} />
      <h6>{review.name}</h6>
      <RatingStars ratings={review.rating} />
      <p>{review.comment}</p>
    </div>
  )
}

export default ReviewCard
