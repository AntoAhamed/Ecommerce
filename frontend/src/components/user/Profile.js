import React, { useEffect, useState } from 'react'
import userPic from '../../assets/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, logout } from '../../features/userSlice';
import { Button } from '@mui/material';

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userInfo, error, message } = useSelector((state) => state.user);

    const handleLogout = async () => {
        dispatch(logout())

        navigate('/login')
    }

    const isToken = () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (!token) {
            navigate('/login')
        }

        dispatch(loadUser())
    }

    useEffect(() => {
        isToken()
    }, [dispatch]);

    return (
        <div className='grid gap-4 lg:grid-cols-2 sm:grid-cols-1'>
            <div className='flex flex-col pb-14 border-r-2'>
                <h3 className='text-3xl font-semibold mb-2 p-3'>My Profile</h3>
                <div className='mb-10 p-3 flex justify-center'>
                    <img src={userInfo?.user?.avatar?.url || userPic} alt='' width={'30%'} className='rounded-lg' />
                </div>

                <div className='flex flex-col'>
                    <button className='border p-2 m-3 bg-blue-500 rounded-md text-white' onClick={() => navigate('/update-profile')}>Edit Profile</button>
                    {userInfo?.user?.role === 'admin' ? <button className='border p-2 m-3 bg-blue-500 rounded-md text-white' onClick={() => navigate('/admin-dashboard')}>Dashboard</button> : ''}
                    <button className='border p-2 m-3 bg-blue-500 rounded-md text-white' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='p-3 flex flex-col justify-center'>
                <div>
                    <p className='text-2xl font-semibold mb-2'>Full Name</p>
                    <p className='text-lg mb-3'>{userInfo?.user?.name}</p>
                </div>

                <div>
                    <p className='text-2xl font-semibold mb-2'>Email</p>
                    <p className='text-lg mb-3'>{userInfo?.user?.email}</p>
                </div>

                <div>
                    <p className='text-2xl font-semibold mb-2'>Joined On</p>
                    <p className='text-lg mb-3'>{userInfo?.user?.createdAt}</p>
                </div>

                <div className='grid grid-cols-2'>
                    <button className='border p-2 m-3 bg-blue-500 rounded-md text-white' onClick={() => navigate('/user-orders')}>My Orders</button>
                    <button className='border p-2 m-3 bg-blue-500 rounded-md text-white' onClick={() => navigate('/update-password')}>Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
