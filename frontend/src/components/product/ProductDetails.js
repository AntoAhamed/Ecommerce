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
    const { isAuth } = useSelector((state) => state.user)
    const { isLoading, productInfo, reviewInfo, error } = useSelector((state) => state.product)

    // Initial quantity of product
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
        alert('Product added to cart')
    }

    // Review
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const handleReviewSubmit = async () => {
        if (!isAuth) {
            return navigate('/login')
        }

        const newReview = {
            rating,
            comment,
            productId: id,
        }

        await dispatch(createReview(newReview))

        if (reviewInfo?.success) {
            setRating(0)
            setComment('')
            handleClose()
            await dispatch(getProductDetails(id))
        } else {
            console.log(error)
        }
    }

    // Modal Style
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

    // Modal State
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch])

    return (
        <div className='flex flex-col items-center p-4'>
            <span className='text-3xl px-4 py-2 mb-3 border-b-2'>Product Details</span>
            {isLoading ? <Loader /> :
                <Fragment>
                    <div className='grid lg:grid-cols-2 sm:grid-cols-1 mb-4'>
                        <div className='border-4 rounded-lg flex justify-center items-center lg:mx-16'>
                            <img src={productInfo?.product?.images[0].url} alt='Product' />
                        </div>
                        <div className=''>
                            <div className='border-b py-2'>
                                <p className='text-2xl font-bold'>{productInfo?.product?.name}</p>
                                <p className='text-sm text-gray-600'>Product ID ### {productInfo?.product?._id}</p>
                            </div>

                            <div className='border-b pb-2'>
                                <RatingStars ratings={Number(productInfo?.product?.ratings)} />
                                ({productInfo?.product?.numOfReviews} Reviews)
                            </div>

                            <div className='border-b py-2'>
                                <p className='text-xl font-semibold mb-2'>${productInfo?.product?.price}</p>
                                <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mb-2'>
                                    <div className='grid grid-cols-3'>
                                        <Button variant='contained' onClick={decQty}>-</Button>
                                        <input type='number' className='border outline-none rounded-lg' min={'0'} readOnly value={quantity} />
                                        <Button variant='contained' disabled={productInfo?.product?.stock <= 0} onClick={incQty}>+</Button>
                                    </div>
                                    <div>
                                        <Button variant='contained' disabled={productInfo?.product?.stock <= 0} onClick={handleAddToCart}>Add to Cart</Button>
                                    </div>
                                </div>
                            </div>

                            <p className='text-lg py-2 border-b'>Status: {productInfo?.product?.stock > 0 ? <span className='text-green-800 font-bold'>In Stock</span> : <span className='text-red-800 font-bold'>Out of Stock</span>}</p>

                            <div className='py-2'>
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
                    <span className='text-2xl my-4 border-b-2 px-4 py-2'>Reviews</span>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
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
