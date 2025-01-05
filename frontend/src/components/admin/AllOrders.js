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
import { deleteOrder, getAllOrders } from '../../features/orderSlice'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material';

function AllOrders() {
    const dispatch = useDispatch()
    const { isLoading, orderInfo, error } = useSelector((state) => state.order)

    const orders = []

    orderInfo && orderInfo?.orders?.forEach(order => {
        orders.push({
            id: order._id,
            status: order.orderStatus,
            itemsQty: order.orderItems.length,
            amount: order.totalPrice,
        })
    });

    const deleteOrderHandler = async (id) => {
        await dispatch(deleteOrder(id))
        dispatch(getAllOrders())
    }

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

    return (
        <div className={`grid lg:grid-cols-5 ${orders.length <= 3 ? 'h-screen' : 'h-full'}`}>
            <Sidebar active={"orders"} />
            <div className='lg:col-span-4 p-4 text-center'>
                <p className='text-3xl font-semibold mb-3'>All Orders</p>
                <TableContainer component={Paper} className='p-5'>
                    <Table sx={{ minWidth: 650, border: '1px solid lightgray' }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'gray' }}>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Order ID</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Status</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Items Qty</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Amount</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.length > 0 ? orders.map((order, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.id}
                                    </TableCell>
                                    <TableCell align="left">{order.status}</TableCell>
                                    <TableCell align="left">{order.itemsQty}</TableCell>
                                    <TableCell align="left">{order.amount}</TableCell>
                                    <TableCell align="left">
                                        <Box component={Link} className='border rounded p-2 bg-blue-300 text-black' to={`/admin-update-order/${order.id}`}>Edit </Box>
                                        <Box component={Link} className='border rounded p-2 bg-red-500 ml-2 text-white' to='' onClick={() => deleteOrderHandler(order.id)}>Remove</Box>
                                    </TableCell>
                                </TableRow>
                            )) : <p className='p-3'>No orders to show</p>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AllOrders
