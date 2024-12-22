import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userPic from '../../assets/user.png'
import { updateProfile } from '../../features/userSlice';
import { Button } from '@mui/material'

function UpdateProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userInfo, error } = useSelector((state) => state.user);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const myData = {
            name,
            email,
            avatar,
        }

        dispatch(updateProfile(myData))

        if (userInfo.success === true) {
            alert("Profile updated successfully")

            setName('')
            setEmail('')
            setAvatar('')

            navigate('/profile')
        }
    }

    const handleImageChange = (e) => {
        try {
            const file = e.target.files[0];

            const limit = 1 * 1024 * 1024;

            if (file && file.size > limit) {
                alert("File size exceeds.")
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setAvatar(reader.result); // Set Base64 string to image state
                }
            }
        } catch (e) {
            setAvatar(userPic)
            console.log(e)
        }
    };

    const isToken = () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (!token) {
            navigate('/login')
        }
    }

    useEffect(() => {
        isToken()
    }, [])
    return (
        <div className='border-2' style={{ padding: '5% 15%', margin: '5% 25%' }}>
            <div className='flex flex-col items-center'>
                <p className='text-4xl font-semibold mb-3'>Update Profile</p>
                <form encType='multipart/form-data' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <p className="text-lg">Update Name</p>
                        <input type="text" className="border-2 w-full p-2" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Update Email address</p>
                        <input type="email" className="border-2 w-full p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Profile Picture</p>
                        <input type="file" className="border-2 w-full p-2" accept='.png, .jpg, .jpeg' onChange={handleImageChange} required />
                    </div>


                    <div className='grid mb-3'>
                        <Button variant='contained' type="submit">Confirm Update</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile
