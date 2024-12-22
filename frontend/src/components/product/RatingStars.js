import React, { useEffect } from 'react'
import ReactStars from "react-rating-stars-component";

function RatingStars(props) {
    const { ratings } = props

    const ratingChanged = () => {

    }

    return (
        <ReactStars
            count={5}
            value={ratings}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
        />
    )
}

export default RatingStars
