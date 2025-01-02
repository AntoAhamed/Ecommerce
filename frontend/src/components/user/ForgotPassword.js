import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../features/userSlice'
import { Button } from '@mui/material'
import { use } from 'react'

function ForgotPassword() {
    const dispatch = useDispatch()
    const { isLoading, user, error, userInfo } = useSelector((state) => state.user)

    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(forgetPassword({email}))

        if (userInfo?.success) {
            alert("Password reset link sent to your email")
        }else{
            console.log(error)
        }
    }

    return (
        <div className='border-2 bg-gray-100' style={{ padding: '5% 15%', margin: '7% 25%' }}>
            <div className='flex flex-col'>
                <p className='text-3xl font-semibold text-center mb-3'>Forgot Password</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <p className="text-lg">Email address</p>
                        <input type="email" className="border-2 w-full p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className='grid mb-3'>
                        <Button variant='contained' type="submit">Send Reset Link</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
