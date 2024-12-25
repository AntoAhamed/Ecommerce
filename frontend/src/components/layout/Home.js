import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/productSlice';
import ProductCard from '../product/ProductCard';
import Loader from './Loader';

export default function Home() {
    const dispatch = useDispatch()
    const { isLoading, productInfo, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            <div className='bg-orange-600 h-lvh text-white flex flex-col justify-center items-center rounded-br-full rounded-tr-full rounded-bl-full'>
                <h1 className='lg:text-6xl md:text-5xl sm:text-4xl font-bold mb-6'>Welcome To Ecommerce</h1>
                <p className='text-xl'>You can get whatever you want</p>
            </div>
            <div className='flex flex-col items-center mt-2 mb-8'>
                <span className='text-3xl px-4 py-2 my-8 border-b-2'>Featured Products</span>
                {isLoading ? <Loader /> :
                    <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                        {productInfo && productInfo?.products?.map((product, index) => {
                            return (
                                <ProductCard key={index} product={product} />
                            )
                        })}
                    </div>}
            </div>
        </>
    )
}
