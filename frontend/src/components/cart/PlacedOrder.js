import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PlacedOrder() {
    const navigate = useNavigate()
    
    return (
        <div className='flex flex-col items-center my-52'>
            <Typography variant='h4' className='py-5'>Your Order Placed Successfully.</Typography>
            <Button variant='outlined' onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
    )
}

export default PlacedOrder
