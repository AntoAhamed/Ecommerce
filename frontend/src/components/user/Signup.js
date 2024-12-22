import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userPic from '../../assets/user.png'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../../features/userSlice'
import { Button } from '@mui/material'
import Alert from '../layout/Alert'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userInfo, error } = useSelector((state) => state.user);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(userPic);
    const [avatarPreview, setAvatarPreview] = useState(userPic);

    const [alert, setAlert] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        const myData = {
            name: name,
            email: email,
            password: password,
            avatar: avatar,
        }

        try {
            const res = await dispatch(signup(myData))
            console.log(res.payload)
            if (res.payload.success === true) {
                setAlert({
                    show: true,
                    severity: "success",
                    title: "Successful Signup",
                    message: "You are signed up successfully!",
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

    const handleImageChange = (e) => {
        try {
            const reader = new FileReader()

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        } catch (e) {
            console.log(e)
        }
    };

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
                <p className='text-4xl font-semibold mb-3'>Signup</p>
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
                        <p className="text-lg">Name</p>
                        <input type="text" className="border-2 w-full p-2" name='name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Email address</p>
                        <input type="email" className="border-2 w-full p-2" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Password</p>
                        <input type="password" className="border-2 w-full p-2" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="mb-3 flex flex-col items-center">
                        <img src={avatarPreview} alt='' width={'12%'} />
                        <div>
                            <p className="text-lg">Profile Picture</p>
                            <input type="file" accept='.png, .jpg, .jpeg' className='border-2 p-2' name='avatar' onChange={handleImageChange} required />
                        </div>
                    </div>

                    <div className='grid mb-3'>
                        <Button variant='contained' type="submit">Signup</Button>
                    </div>

                    <div className='mb-3'>
                        <p className='text-center'>Already have an account? Click <Link to='/login'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
