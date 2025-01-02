import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userPic from '../../assets/user.png'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../../features/userSlice'
import { Button } from '@mui/material'
import Loader from '../layout/Loader'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, user, error, userInfo } = useSelector((state) => state.user);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(userPic);
    const [avatarPreview, setAvatarPreview] = useState(userPic);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const myData = {
            name: name,
            email: email,
            password: password,
            avatar: avatar,
        }

        dispatch(signup(myData))

        if (userInfo?.success) {
            navigate('/profile')
        }else{
            console.log(error)
        }
    }

    const handleImageChange = (e) => {
        try {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        } catch (e) {
            console.log(e)
        }
    };
    return (
        <>
            {isLoading ? <Loader /> :
                <div className='border-2 bg-gray-100' style={{ padding: '5% 15%', margin: '5% 25%' }}>
                    <div className='flex flex-col items-center'>
                        <p className='text-4xl font-semibold mb-3'>Signup</p>
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
                                    <input type="file" accept='.png, .jpg, .jpeg' className='border-2 p-2 bg-white' name='avatar' onChange={handleImageChange} required />
                                </div>
                            </div>

                            <div className='grid mb-3'>
                                <Button variant='contained' type="submit">Signup</Button>
                            </div>

                            <div className='mb-3'>
                                <p className='text-center'>Already have an account? Click <Link to='/login' className='text-blue-700 font-semibold'>Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>}
        </>
    )
}

export default Signup
