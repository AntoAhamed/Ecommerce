import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../features/productSlice'
import { getAllUsers } from '../../features/userSlice'
import { getAllOrders } from '../../features/orderSlice'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'

function Dashboard() {
  const dispatch = useDispatch()
  const { productInfo } = useSelector((state) => state.product)
  const { userInfo } = useSelector((state) => state.user)
  const { orderInfo } = useSelector((state) => state.order)

  console.log(productInfo)
  console.log(userInfo)
  console.log(orderInfo)

  let inStock = 0, outOfStock = 0

  productInfo && productInfo?.products?.forEach(product => {
    if(product.stock > 0){
      inStock++
    }else{
      outOfStock++
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(getAllUsers())
    dispatch(getAllOrders())
  }, [dispatch])

  return (
    <div className='grid lg:grid-cols-5 h-full'>
      <Sidebar active={"dashboard"} />
      <div className='lg:col-span-4 p-4 text-center'>
        <p className='text-3xl font-semibold'>Dashboard</p>
        <div className='bg-red-400 my-4 py-2 text-white'>
          <p>Total Amount</p>
          <p>${orderInfo?.totalAmount?.toFixed(2)}</p>
        </div>
        <div className='flex justify-around lg:py-10 py-7'>
          <div className='border-0 rounded-full lg:p-10 p-5 lg:m-2 m-1 text-lg bg-green-400'>
            <p>Product</p>
            <p>{productInfo && productInfo?.products?.length}</p>
          </div>
          <div className='border-0 rounded-full lg:p-10 p-5 lg:m-2 m-1 text-lg bg-yellow-400'>
            <p>Orders</p>
            <p>{orderInfo && orderInfo?.orders?.length}</p>
          </div>
          <div className='border-0 rounded-full lg:p-10 p-5 lg:m-2 m-1 text-lg bg-orange-400'>
            <p>Users</p>
            <p>{userInfo && userInfo?.users?.length}</p>
          </div>
        </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-1 py-16'>
          <div className='lg:col-span-2'>
            <LineChart total={orderInfo?.totalAmount?.toFixed(2)} />
          </div>
          <div>
            <DoughnutChart stocks={{inStock, outOfStock}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
