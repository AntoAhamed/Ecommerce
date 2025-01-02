import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../features/orderSlice';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const dispatch = useDispatch()
    const { orderInfo } = useSelector((state) => state.order)

    const rows = []

    orderInfo && orderInfo?.orders?.forEach(order => {
        rows.push(order)
    })

    useEffect(() => {
        dispatch(myOrders())
    }, [dispatch])

    return (
        <TableContainer component={Paper} className={`p-5 ${rows.length <= 3 && 'h-screen'}`}>
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
                    {rows.length > 0 ? rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell align="left">{row.orderStatus}</TableCell>
                            <TableCell align="left">{row.orderItems.length}</TableCell>
                            <TableCell align="left">{row.totalPrice.toFixed(2)}</TableCell>
                            <TableCell align="left">
                                <Link to={`/order-details/${row._id}`}>
                                    <Button variant='contained'>View</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    )) : <p className='p-3'>No orders to show</p>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
