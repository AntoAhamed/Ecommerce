import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loadUser } from '../../features/userSlice'
import { createOrder } from '../../features/orderSlice'
import { Button } from '@mui/material';
import Loader from '../layout/Loader'

function ConfirmOrder() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const { isLoading, orderInfo, error } = useSelector((state) => state.order)

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    )

    const shippingCharges = subTotal > 1000 ? 0 : 200;

    const vat = subTotal * 0.18;

    const totalPrice = subTotal + vat + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const handleConfirmOrder = () => {
        const orderData = {
            shippingInfo,
            orderItems: cartItems,
            itemsPrice: subTotal,
            taxPrice: vat,
            shippingPrice: shippingCharges,
            totalPrice: totalPrice,
        }

        dispatch(createOrder(orderData))

        if (orderInfo?.success) {
            navigate('/placed-order')
        }
    }
    return (
        <>
            {isLoading ? <Loader /> :
                <div className='grid lg:grid-cols-2 md:grid-cols-1 p-4'>
                    <div className='p-4 border-r'>
                        <p className='text-2xl font-semibold mb-3'>Shipping Info</p>
                        <p>Name: {user?.name}</p>
                        <p>Mobile: {shippingInfo.number}</p>
                        <p className='mb-9'>Address: {address}</p>
                        <p className='text-2xl font-semibold mb-3'>Your Cart Items</p>
                        {cartItems && cartItems.map((item, index) => (
                            <div key={index} className='flex justify-between my-5'>
                                <img src={item.image} alt='' width={'7%'} />
                                <Link to={`/product-details/${item.product}`}>
                                    {item.name}
                                </Link>
                                <span>{item.quantity} X ${item.price} = <b>${item.quantity * item.price}</b></span>
                            </div>
                        ))}
                    </div>
                    <div className='p-36'>
                        <p className='text-2xl font-semibold border-b p-2'>Order Summery</p>
                        <div className='flex justify-between p-2'>
                            <span>Subtotal:</span>
                            <span>${subTotal}</span>
                        </div>
                        <div className='flex justify-between p-2'>
                            <span>Shipping Charge:</span>
                            <span>${shippingCharges}</span>
                        </div>
                        <div className='flex justify-between border-b p-2'>
                            <span>VAT:</span>
                            <span>${vat.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between p-2'>
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='grid p-2'>
                            <Button variant='contained' onClick={handleConfirmOrder}>Confirm Order</Button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default ConfirmOrder
