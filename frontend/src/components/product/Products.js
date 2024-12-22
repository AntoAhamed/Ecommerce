import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/productSlice';
import ProductCard from './ProductCard';
import Loader from '../layout/Loader';

function Products() {
  const dispatch = useDispatch()
  const { isLoading, productInfo, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div className='flex flex-col justify-center items-center'>
      <span className='text-3xl p-4 my-4 border-b-2'>Products</span>
      {isLoading ? <Loader /> :
        <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-4 mb-16'>
          {productInfo?.success && productInfo?.products?.map((product, index) => {
            return (
              <ProductCard key={index} product={product} />
            )
          })}
        </div>}
    </div>
  )
}

export default Products
