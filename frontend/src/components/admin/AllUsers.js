import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../../features/userSlice'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material';

function AllUsers() {
    const dispatch = useDispatch()
    const { isLoading, userInfo, error } = useSelector((state) => state.user)

    const users = []

    userInfo && userInfo?.users?.forEach(user => {
        users.push({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        })
    });

    const deleteUserHandler = async (id) => {
        await dispatch(deleteUser(id))
        dispatch(getAllUsers())
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className={`grid lg:grid-cols-5 ${users.length <= 3 && 'h-screen'}`}>
            <Sidebar active={"users"} />
            <div className='lg:col-span-4 p-4 text-center'>
                <p className='text-3xl font-semibold mb-3'>All Users</p>
                <TableContainer component={Paper} className='p-5'>
                    <Table sx={{ minWidth: 650, border: '1px solid lightgray' }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'gray' }}>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>User ID</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Email</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Name</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Role</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? users.map((user, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{user.name}</TableCell>
                                    <TableCell align="left">{user.role}</TableCell>
                                    <TableCell align="left">
                                        <Box component={Link} className='border rounded p-2 bg-blue-300 text-black' to={`/admin-update-user/${user.id}`}>Edit </Box>
                                        <Box component={Link} className='border rounded p-2 bg-red-500 ml-2 text-white' to='' onClick={() => deleteUserHandler(user.id)}>Remove</Box>
                                    </TableCell>
                                </TableRow>
                            )):<p className='p-3'>No users to show</p>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AllUsers
