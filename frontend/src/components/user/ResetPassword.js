import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadUser, resetPassword } from '../../features/userSlice'

function ResetPassword() {
  const { token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, user, error, userInfo } = useSelector((state) => state.user)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const passwords = {
      newPassword,
      confirmPassword,
    }

    dispatch(resetPassword({ token, passwords }))

    if (userInfo?.success) {
      alert("Account recovered successfully")

      await dispatch(loadUser())

      navigate('/profile')
    } else {
      console.log(error)
    }
  }

  return (
    <div className='border-2' style={{ padding: '5% 15%', margin: '5% 25%' }}>
      <p className='text-4xl font-semibold mb-3 text-center'>Reset Password</p>
      <div className='flex flex-col'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p className="text-lg">New Password</p>
            <input type="password" className="border-2 w-full p-2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>

          <div className="mb-3">
            <p className="text-lg">Confirm Password</p>
            <input type="password" className="border-2 w-full p-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <div className='grid mb-3'>
            <Button variant='contained' type="submit">Reset</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
