import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem'
import { removeItemsFromCart } from '../../features/cartSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';

function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector((state) => state.cart)

    const removeCartItem = (id) => {
        dispatch(removeItemsFromCart(id))
    }

    const isToken = () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (!token) {
            return navigate('/login')
        }

        navigate("/shipping-details")
    }

    const handleCheckOut = () => {
        isToken()
    }

    return (
        <TableContainer component={Paper} className='p-5'>
            <Table sx={{ minWidth: 650, border: '1px solid lightgray' }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'gray' }}>
                        <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Product</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Quantity</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems && cartItems.map((item, index) => (
                        <CartItem key={index} item={item} removeCartItem={removeCartItem} />
                    ))}
                </TableBody>
            </Table>
            <div className='flex justify-around my-3'>
                <span className='text-xl font-semibold'>Gross Total (In {cartItems ? `${cartItems.length}` : '0'} Items)</span>
                <span className='text-xl font-semibold'>${cartItems ? cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price, 0
                ) : '0'}</span>
            </div>
            <div className='grid'>
                <Button variant='contained' disabled={cartItems.length === 0} onClick={handleCheckOut}>Check Out</Button>
            </div>
        </TableContainer>
    )
}

export default Cart
