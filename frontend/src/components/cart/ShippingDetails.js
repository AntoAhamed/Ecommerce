import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../features/cartSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function ShippingDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingInfo } = useSelector((state) => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [number, setNumber] = useState(shippingInfo.number)
    const [country, setCountry] = useState(shippingInfo.country)

    const handleSubmit = (e) => {
        e.preventDefault()

        const myData = {
            address,
            city,
            pinCode,
            number,
            country,
        }

        dispatch(saveShippingInfo(myData))

        navigate('/confirm-order')
    }
    return (
        <div className='border-2 bg-gray-100' style={{ padding: '5% 15%', margin: '5% 20%' }}>
            <div className='flex flex-col'>
                <p className='text-4xl font-semibold mb-3 text-center'>Shipping Details</p>
                <form encType='multipart/form-data' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <p className="text-lg">Address</p>
                        <input type="text" className="border-2 w-full p-2" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">City</p>
                        <input type="text" className="border-2 w-full p-2" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Pin Code</p>
                        <input type="number" className="border-2 w-full p-2" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Mobile Number</p>
                        <input type="number" className="border-2 w-full p-2" value={number} onChange={(e) => setNumber(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Country</p>
                        <input type="text" className="border-2 w-full p-2" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>

                    <div className='grid mb-3'>
                        <Button variant='contained' type="submit">Continue</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShippingDetails
