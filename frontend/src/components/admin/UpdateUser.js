import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { getUserDetails, updateUser } from '../../features/userSlice'

function UpdateUser() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const roles = ['user', 'admin']
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(roles[0])
  const {isLoading, userInfo, error, success} = useSelector((state)=>state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const userData = {
      name,
      email,
      role,
    }

    dispatch(updateUser({id, userData}))

    if(success){
      alert("User updated successfully")

      navigate('/admin-users')
    }
  }

  const fetchData = () => {
    dispatch(getUserDetails(id))

    if(userInfo){
      setName(userInfo?.user?.name)
      setEmail(userInfo?.user?.email)
    }
  }

  useEffect(()=>{
    fetchData()
  },[dispatch, userInfo])

  return (
    <div className='grid grid-cols-5'>
      <Sidebar />
      <div className='col-span-4 p-4' style={{ padding: '10% 30%' }}>
        <p className='text-4xl font-semibold mb-3 text-center'>Update User Role</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p className="text-lg">Name</p>
            <input type="text" className="border-2 w-full p-2" disabled value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <p className="text-lg">Email</p>
            <input type="email" className="border-2 w-full p-2" disabled value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <p className="text-lg">Role (Current: <span className='font-semibold'>{userInfo?.user?.role}</span>)</p>
            <select className="border-2 w-full p-2" value={role} onChange={(e) => setRole(e.target.value)} required>
              {roles.map((option, index)=>(
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
