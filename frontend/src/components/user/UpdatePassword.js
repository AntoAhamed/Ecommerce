import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../features/userSlice';
import { Button } from '@mui/material'

function UpdatePassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userInfo, error } = useSelector((state) => state.user);

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const myData = {
            oldPassword,
            newPassword,
            confirmPassword,
        }

        dispatch(updatePassword(myData))

        if (userInfo.success === true) {
            alert("Password updated successfully")

            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')

            navigate('/profile')
        }
    }

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
        </div>
    )
}

export default UpdatePassword
