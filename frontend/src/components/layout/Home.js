import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/productSlice';
import ProductCard from '../product/ProductCard';
import Loader from './Loader';

export default function Home() {
    const dispatch = useDispatch()
    const { isLoading, productInfo, error } = useSelector((state) => state.product);

    const [filters, setFilters] = useState({
        keyword: '',
        category: '',
        minPrice: 0,
        maxPrice: 100000,
        ratings: 0,
        page: 1,
        limit: 4,
    });

    useEffect(() => {
        dispatch(getProducts(filters))
    }, [dispatch])

    return (
        <>
            {isLoading ? <Loader /> :
                <div>
                    <div className='bg-orange-600 h-lvh text-white flex flex-col justify-center items-center rounded-br-full rounded-tr-full mr-16 shadow-xl'>
                        <h1 className='lg:text-6xl md:text-5xl sm:text-4xl font-bold mb-6 hover:text-8xl transition-all hover:transition-all'>Welcome To Ecommerce</h1>
                        <p className='text-xl hover:text-lg transition-all hover:transition-all'>You can get whatever you want</p>
                    </div>
                    <div className='flex flex-col items-center mt-4 mb-16'>
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
                </div>}
        </>
    )
}
