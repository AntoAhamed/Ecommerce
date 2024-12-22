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
import { deleteProduct, getAdminProducts } from '../../features/productSlice'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material';

function AllProducts() {
    const dispatch = useDispatch()
    const { isLoading, productInfo, error, success, message } = useSelector((state) => state.product)

    const products = []

    productInfo && productInfo?.products?.forEach(product => {
        products.push(product)
    });

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [dispatch, productInfo])

    return (
        <div className='grid grid-cols-5'>
            <Sidebar />
            <div className='col-span-4 p-4 text-center'>
                <p className='text-3xl font-semibold mb-3'>All Products</p>
                <TableContainer component={Paper} className='p-5'>
                    <Table sx={{ minWidth: 650, border: '1px solid lightgray' }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'gray' }}>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Product ID</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Name</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Stock</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Price</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.length > 0 ? products.map((product, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product._id}
                                    </TableCell>
                                    <TableCell align="left">{product.name}</TableCell>
                                    <TableCell align="left">{product.stock}</TableCell>
                                    <TableCell align="left">{product.price}</TableCell>
                                    <TableCell align="left">
                                        <Box component={Link} className='border rounded p-2 bg-blue-300 text-black' to={`/admin-update-product/${product._id}`}>Edit </Box>
                                        <Box component={Link} className='border rounded p-2 bg-red-500 ml-2 text-white' to='' onClick={() => deleteProductHandler(product._id)}>Remove</Box>
                                    </TableCell>
                                </TableRow>
                            )) : <p className='p-3'>No products to show</p>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AllProducts
