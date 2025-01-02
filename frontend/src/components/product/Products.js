import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/productSlice';
import ProductCard from './ProductCard';
import Loader from '../layout/Loader';
import Slider from '@mui/material/Slider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';

function Products() {
  const dispatch = useDispatch();
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

  // Fetch products whenever filters change
  useEffect(() => {
    dispatch(getProducts(filters));
  }, [filters.category, filters.minPrice, filters.maxPrice, filters.ratings, filters.page, filters.limit]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 })); // Reset to page 1 on search
    dispatch(getProducts(filters));
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category, page: 1 })); // Reset to page 1
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, minPrice: newValue[0], maxPrice: newValue[1], page: 1 }));
  };

  const handleRatingsChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, ratings: newValue, page: 1 }));
  };

  const handlePaginationChange = (event, value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  };

  return (
    <div className={`flex flex-col justify-center items-center ${productInfo?.products?.length <= 0 ? 'lg:pb-12' : ''}`}>
      <span className="text-3xl p-4 my-4 border-b-2">Products</span>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-4">
          <div className="border-r p-4">
            <div className="flex justify-between mb-5">
              <TextField
                id="outlined-basic"
                label="Search for product..."
                variant="outlined"
                size="small"
                className="w-full"
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              />
              <Button variant="contained" size="small" onClick={handleSearch}>
                Search
              </Button>
            </div>
            <div>
              <p className='font-semibold'>Price</p>
              <Slider
                size="small"
                value={[filters.minPrice, filters.maxPrice]}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                sx={{ color: 'orange' }}
              />
            </div>
            <div>
              <p className='font-semibold'>Categories</p>
              <div className="text-gray-500">
                {['Camera', 'Laptop', 'T-shirt', 'Mystery Box'].map((cat) => (
                  <p
                    key={cat}
                    className="hover:cursor-pointer"
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </p>
                ))}
              </div>
            </div>
            <fieldset className="border p-3 mt-3">
              <legend className='font-semibold'>Ratings</legend>
              <Slider
                size="small"
                value={filters.ratings}
                onChange={handleRatingsChange}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.5}
                sx={{ color: 'orange' }}
              />
            </fieldset>
          </div>
          <div className="col-span-3">
            <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-4 mb-16">
              {productInfo?.success &&
                productInfo?.products?.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>
            <div className="flex justify-center py-8">
              <Stack spacing={2}>
                <Pagination
                  count={productInfo?.totalPages || ''}
                  color="primary"
                  page={filters.page}
                  onChange={handlePaginationChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
