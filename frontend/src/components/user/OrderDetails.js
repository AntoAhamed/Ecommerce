import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteOrderByUser, getOredrDetails, updateOrder } from '../../features/orderSlice'

function OrderDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, orderInfo, error, success, message } = useSelector((state) => state.order)

    const handleCancel = () => {
        dispatch(deleteOrderByUser(id))

        if (success) {
            navigate('/user-orders')
        }
    }

    const isToken = () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (!token) {
            navigate('/login')
        }
    }

    useEffect(() => {
        isToken()

        dispatch(getOredrDetails(id))
    }, [dispatch])

    return (
        <div className='grid grid-cols-5'>
            <div className='col-span-4 px-24 py-12 border-r'>
                <p className='text-2xl'>Shipping Info</p>
                <p className='text-lg'>Name: {orderInfo?.order?.user?.name} </p>
                <p className='text-lg'>Phone: {orderInfo?.order?.shippingInfo?.number}</p>
                <p className='text-lg mb-3'>Address: {orderInfo?.order?.shippingInfo?.address + ', ' + orderInfo?.order?.shippingInfo?.city + '-' + orderInfo?.order?.shippingInfo?.pinCode + ', ' + orderInfo?.order?.shippingInfo?.country}</p>
                <p className='text-2xl'>Order Status</p>
                <p className='text-lg mb-3'>{orderInfo?.order?.orderStatus}</p>
                <p className='text-2xl mb-2'>Your Order Items</p>
                {orderInfo?.order?.orderItems.map((element, index) => (
                    <div key={index} className='flex justify-between items-center mb-3'>
                        <img src={element.image} alt='' width={'7%'} />
                        <span className='text-lg'>{element.name}</span>
                        <span className='text-lg'>{`${element.quantity} X $${element.price} = $${element.quantity * element.price}`}</span>
                    </div>
                ))}
                <hr />
                <div className='flex justify-between'>
                    <p className='text-xl mb-2'>Total Amount (With other charges)</p>
                    <p className='text-xl font-bold mb-2'>${orderInfo?.order?.totalPrice?.toFixed(2)}</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center p-3'>
                <p className='text-2xl mb-3'>Action</p>
                <p className='mb-3'>&#9432;You can't modify your order but you can cancel it any time.</p>
                <Button variant='contained' color='error' onClick={handleCancel}>Cancel Order</Button>
            </div>
        </div>
    )
}

export default OrderDetails
