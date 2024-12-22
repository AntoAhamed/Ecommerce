import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOredrDetails, updateOrder } from '../../features/orderSlice'

function UpdateOrder() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, orderInfo, error, success, message } = useSelector((state) => state.order)

    let options = orderInfo?.order?.orderStatus === 'Processing' ? [
        'Processing', 'Shipped', 'Delivered'
    ] : orderInfo?.order?.orderStatus === 'Shipped' ? [
        'Shipped', 'Delivered'
    ] : ['Delivered'];

    const [status, setStatus] = useState(options[0])

    console.log(status)

    const handleProcess = () => {
        dispatch(updateOrder({id, status}))

        console.log(success)

        if(success){
            alert(`Status updated to ${status}`)

            navigate('/admin-orders')
        }
    }

    useEffect(() => {
        dispatch(getOredrDetails(id))
    }, [dispatch])

    return (
        <div className='grid grid-cols-5'>
            <Sidebar />
            <div className='col-span-3 p-6 border-r'>
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
                    <p className='text-xl font-bold mb-2'>${orderInfo?.order?.totalPrice}</p>
                </div>
            </div>
            <div className='flex flex-col items-center p-3'>
                <p className='text-2xl mb-3'>Process Order</p>
                <select className="border-2 w-full p-2 mb-3" value={status} onChange={(e) => setStatus(e.target.value)}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                <Button variant='contained' onClick={handleProcess}>Process</Button>
            </div>
        </div>
    )
}

export default UpdateOrder
