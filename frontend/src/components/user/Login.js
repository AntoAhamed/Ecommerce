import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { forgetPassword, login } from '../../features/userSlice'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Alert from '../layout/Alert'

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userInfo, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [alert, setAlert] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        const myData = {
            email: email,
            password: password,
        }

        try {
            const res = await dispatch(login(myData))
            console.log(res.payload)
            if (res.payload.success === true) {
                setAlert({
                    show: true,
                    severity: "success",
                    title: "Successful Login",
                    message: "You are logged in successfully!",
                })
                navigate('/profile')
            } else {
                setAlert({
                    show: true,
                    severity: "error",
                    title: "Something went wrong",
                    message: error.message,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const isToken = () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (token) {
            navigate('/profile')
        }
    }

    useEffect(() => {
        isToken()
    }, [])

    return (
        <div className='border-2' style={{ padding: '5% 15%', margin: '5% 25%' }}>
            <div className='flex flex-col items-center'>
                <p className='text-4xl font-semibold mb-3'>Login</p>
                {alert.show && (
                    <Alert
                        severity={alert.severity}
                        title={alert.title}
                        message={alert.message}
                        onClose={() => setAlert({ ...alert, show: false })}
                    />
                )}
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
                        <p className='text-center'>Don't have an account? Click <Link to='/signup'>Signup</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
