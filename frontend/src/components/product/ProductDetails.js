import React, { Fragment, useEffect, useState } from 'react'
import cover from '../../assets/cover.jpg'
import ReviewCard from './ReviewCard'
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getProductDetails } from '../../features/productSlice';
import RatingStars from './RatingStars';
import { useNavigate, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { addItemsToCart } from '../../features/cartSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Loader from '../layout/Loader';

function ProductDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, productInfo, error, success } = useSelector((state) => state.product)

    const [quantity, setQuantity] = useState(1)

    const incQty = () => {
        if (productInfo?.product?.Stock <= quantity) return;

        const qty = quantity + 1;

        setQuantity(qty);
    };

    const decQty = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;

        setQuantity(qty);
    };

    const handleAddToCart = () => {
        dispatch(addItemsToCart({ id, quantity }))

        navigate('/cart')
    }

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const handleReviewSubmit = () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (!token) {
            return navigate('/login')
        }

        const newReview = {
            rating,
            comment,
            productId: id,
        }

        dispatch(createReview(newReview))

        if (success) {
            setRating(0)
            setComment('')

            handleClose()
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch])

    return (
        <div className='flex flex-col items-center'>
            <span className='text-3xl p-4 my-4 border-b-2'>Product Details</span>
            {isLoading ? <Loader /> :
                <Fragment>
                    <div className='grid gap-4 lg:grid-cols-2 sm:grid-cols-1'>
                        <div className='p-2'>
                            <img src={productInfo?.product?.image} alt='Product' />
                        </div>
                        <div className='p-2'>
                            <div className='pb-2 border-b'>
                                <p className='text-2xl font-bold'>{productInfo?.product?.name}</p>
                                <p className='text-sm text-gray-600'>Product ID # {productInfo?.product?._id}</p>
                            </div>

                            <div className='pb-2 border-b'>
                                <RatingStars ratings={Number(productInfo?.product?.ratings)} />
                                ({productInfo?.product?.numOfReviews} Reviews)
                            </div>

                            <div className='pt-2 pb-4 border-b'>
                                <p className='text-xl font-semibold mb-2'>${productInfo?.product?.price}</p>
                                <div className='flex'>
                                    <div className='flex mr-4'>
                                        <Button variant='contained' onClick={decQty}>-</Button>
                                        <input type='number' className='border pl-1' min={'0'} readOnly value={quantity} />
                                        <Button variant='contained' disabled={productInfo?.product?.stock <= 0} onClick={incQty}>+</Button>
                                    </div>
                                    <Button variant='contained' disabled={productInfo?.product?.stock <= 0} onClick={handleAddToCart}>Add to Cart</Button>
                                </div>
                            </div>

                            <p className='text-lg pt-2 pb-2 border-b'>Status: {productInfo?.product?.stock > 0 ? <span className='text-green-800 font-bold'>In Stock</span> : <span className='text-red-800 font-bold'>Out of Stock</span>}</p>

                            <div className='pt-2 pb-2'>
                                <p className='text-lg mb-2'>Product Description</p>
                                <p className='text-md mb-2'>{productInfo?.product?.description}</p>
                                <Button variant='contained' onClick={handleOpen}>Submit Review</Button>
                            </div>
                        </div>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                                Submit Review
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <ReactStars
                                    count={5}
                                    value={rating}
                                    onChange={(newRating) => setRating(newRating)}
                                    size={40}
                                    activeColor="#ffd700"
                                />
                                <textarea className="border w-full p-2" rows="5" value={comment} onChange={(e) => setComment(e.target.value)} />
                            </Typography>
                            <div className="flex justify-end">
                                <Button variant='text' onClick={handleClose} >Close</Button>
                                <Button variant='text' onClick={handleReviewSubmit}>Save changes</Button>
                            </div>
                        </Box>
                    </Modal>
                    <span className='text-2xl p-4 my-4 border-b-2'>Reviews</span>
                    <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                        {productInfo?.product?.reviews?.length ?
                            productInfo?.product?.reviews?.map((review, index) => (<ReviewCard key={index} review={review} />)) :
                            <Typography className=''>No Reviews To Show</Typography>
                        }
                    </div>
                </Fragment>}
        </div>
    )
}

export default ProductDetails
