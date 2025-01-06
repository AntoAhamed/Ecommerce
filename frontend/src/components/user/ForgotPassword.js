import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../features/userSlice'
import { Button } from '@mui/material'

function ForgotPassword() {
    const dispatch = useDispatch()
    const { isLoading, user, error, userInfo } = useSelector((state) => state.user)

    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(forgetPassword(email))

        if (userInfo?.success) {
            alert("Password reset link sent to your email")
        }else{
            console.log(error)
        }
    }

    return (
        <div className='h-screen'>
            <div className='flex flex-col border-2 bg-gray-100 lg:mx-72 md:mx-52 lg:my-12 md:my-10 m-8 lg:px-32 md:px-16 lg:py-6 md:py-4 px-2 py-8'>
                <p className='lg:text-4xl text-2xl font-semibold mb-3 text-center'>Forgot Password</p>
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
