import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/productSlice';
import ProductCard from './ProductCard';
import Loader from '../layout/Loader';
import Slider from '@mui/material/Slider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';

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
        <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-4'>
          <div className='border-r p-4'>
            <div className='flex justify-between mb-5'>
              <TextField id="outlined-basic" label="Search for product..." variant="outlined" size='small' className='w-full' />
              <Button variant='contained' size='small'>Search</Button>
            </div>
            <div>
              <p>Price</p>
              <Slider
                size="small"
                defaultValue={70}
                aria-label="Small"
                valueLabelDisplay="auto"
              />
            </div>
            <div>
              <p>Categories</p>
              <div className='text-gray-500'>
                <p className='hover:cursor-pointer'>Camera</p>
                <p className='hover:cursor-pointer'>Laptop</p>
                <p className='hover:cursor-pointer'>T-shirt</p>
              </div>
            </div>
            <fieldset className='border p-3 mt-3'>
              <legend>Ratings</legend>
              <Slider
                size="small"
                defaultValue={70}
                aria-label="Small"
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
          <div className='col-span-3'>
            <div className='grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-4 mb-16'>
              {productInfo?.success && productInfo?.products?.map((product, index) => {
                return (
                  <ProductCard key={index} product={product} />
                )
              })}
            </div>
            <div className='flex justify-center py-8'>
              <Stack spacing={2}>
                <Pagination count={10} color="primary" />
              </Stack>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Products
