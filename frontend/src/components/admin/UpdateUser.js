import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { getUserDetails, updateUser } from '../../features/userSlice'

function UpdateUser() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const roles = ['user', 'admin']
  const [role, setRole] = useState(roles[0])
  const { isLoading, userInfo, error } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name: userInfo?.user?.name,
      email: userInfo?.user?.email,
      role,
    }

    dispatch(updateUser({ id, userData }))

    if (userInfo?.success) {
      alert("User updated successfully")
      navigate('/admin-users')
    } else {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(getUserDetails(id))
  }, [dispatch])

  return (
    <div className='grid lg:grid-cols-5'>
      <Sidebar />
      <div className='lg:col-span-4 border-2 bg-gray-50 lg:mx-32 md:mx-16 lg:my-16 md:my-8 m-4 lg:px-32 md:px-16 px-4 lg:py-16 md:py-8 py-4'>
        <p className='text-4xl font-semibold mb-3 text-center'>Update User Role</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p className="text-lg">Name</p>
            <input type="text" className="border-2 w-full p-2" disabled placeholder={userInfo?.user?.name} required />
          </div>

          <div className="mb-3">
            <p className="text-lg">Email</p>
            <input type="email" className="border-2 w-full p-2" disabled placeholder={userInfo?.user?.email} required />
          </div>

          <div className="mb-3">
            <p className="text-lg">Role (Current: <span className='font-semibold'>{userInfo?.user?.role}</span>)</p>
            <select className="border-2 w-full p-2" value={role} onChange={(e) => setRole(e.target.value)} required>
              {roles.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className='grid mb-3'>
            <Button variant='contained' type="submit">Update</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
