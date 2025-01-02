import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { forgetPassword, login } from '../../features/userSlice'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Loader from '../layout/Loader';

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, user, error, userInfo } = useSelector((state) => state.user);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const myData = {
            email: email,
            password: password,
        }

        dispatch(login(myData))

        if (userInfo?.success) {
            navigate('/profile')
        }else{
            console.log(error)
        }
    }
    return (
        <>
            {isLoading ? <Loader /> : <div className='border-2 bg-gray-100' style={{ padding: '5% 15%', margin: '5% 25%' }}>
                <div className='flex flex-col items-center'>
                    <p className='text-4xl font-semibold mb-3'>Login</p>
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <p className="text-lg">Email address</p>
                            <input type="email" className="border-2 w-full p-2" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <p className="text-lg">Password</p>
                            <input type="password" className="border-2 w-full p-2" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <Link to='/password/forgot' className=''>
                                <p className='text-gray-500'>Forgot password?</p>
                            </Link>
                        </div>

                        <div className='grid mb-3'>
                            <Button variant='contained' type="submit" className="">Login</Button>
                        </div>

                        <div className='mb-3'>
                            <p className='text-center'>Don't have an account? Click <Link to='/signup' className='text-blue-700 font-semibold'>Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>}
        </>

    )
}
