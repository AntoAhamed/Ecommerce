import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, updatePassword } from '../../features/userSlice';
import { Button } from '@mui/material'
import Loader from '../layout/Loader';

function UpdatePassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, user, error, userInfo } = useSelector((state) => state.user);

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const myData = {
            oldPassword,
            newPassword,
            confirmPassword,
        }

        dispatch(updatePassword(myData))

        if (userInfo?.success) {
            alert("Password updated successfully")

            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')

            await dispatch(loadUser())

            navigate('/profile')
        } else {
            console.log(error)
        }
    }
    return (
        <>
            {isLoading ? <Loader /> :
                <div className='border-2 bg-gray-100' style={{ padding: '5% 15%', margin: '5% 25%' }}>
                    <div className='flex flex-col'>
                        <p className='text-4xl font-semibold mb-3'>Update Password</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <p className="text-lg">Old Password</p>
                                <input type="password" className="border-2 w-full p-2" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <p className="text-lg">New Password</p>
                                <input type="password" className="border-2 w-full p-2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <p className="text-lg">Confirm Password</p>
                                <input type="password" className="border-2 w-full p-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>

                            <div className='grid mb-3'>
                                <Button variant='contained' type="submit">Confirm Update</Button>
                            </div>
                        </form>
                    </div>
                </div>}
        </>
    )
}

export default UpdatePassword
