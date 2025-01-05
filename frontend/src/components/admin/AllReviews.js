import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReview, getAllReviews } from '../../features/productSlice'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material';

function AllReviews() {
    const dispatch = useDispatch()
    const { isLoading, productInfo, reviewInfo, error } = useSelector((state) => state.product)

    const [productId, setPrductId] = useState('')

    const handleProductIdSubmit = () => {
        dispatch(getAllReviews(productId))
    }

    const reviews = []

    reviewInfo && reviewInfo?.reviews?.forEach((review) => {
        reviews.push({
            id: review._id,
            user: review.name,
            comment: review.comment,
            rating: review.rating,
        })
    })

    const deleteReviewHandler = async (reviewId) => {
        await dispatch(deleteReview({ reviewId, productId }))

        if (productId.length === 24) {
            dispatch(getAllReviews(productId))
        }
    }

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId))
        }
    }, [dispatch])

    return (
        <div className={`grid lg:grid-cols-5 ${reviews.length <= 3 ? 'h-screen' : 'h-full'}`}>
            <Sidebar active={"reviews"} />
            <div className='lg:col-span-4 p-4 text-center'>
                <div className='flex flex-col items-center mb-3 border-8 py-6'>
                    <input type='text' value={productId} onChange={(e) => setPrductId(e.target.value)} className='border rounded-md p-2 my-2 w-80' placeholder='Product ID' />
                    <Button variant='contained' onClick={handleProductIdSubmit}>Search for Review</Button>
                </div>
                <p className='text-3xl font-semibold mb-3'>All Review</p>
                <TableContainer component={Paper} className='p-5'>
                    <Table sx={{ minWidth: 650, border: '1px solid lightgray' }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'gray' }}>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Review ID</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">User</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Comment</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Rating</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviews.length > 0 ? reviews.map((review, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {review.id}
                                    </TableCell>
                                    <TableCell align="left">{review.user}</TableCell>
                                    <TableCell align="left">{review.comment}</TableCell>
                                    <TableCell align="left">{review.rating}</TableCell>
                                    <TableCell align="left">
                                        <Box component={Link} className='border rounded p-2 bg-red-500 ml-2 text-white' to='' onClick={() => deleteReviewHandler(review.id)}>Remove</Box>
                                    </TableCell>
                                </TableRow>
                            )) : <p className='p-3'>No review to show</p>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AllReviews
