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
    <div className='grid grid-cols-5'>
      <Sidebar />
      <div className='col-span-4 p-4 text-center'>
        <p className='text-3xl font-semibold'>Dashboard</p>
        <div className='bg-red-400 my-4 py-2 text-white'>
          <p>Total Amount</p>
          <p>${orderInfo?.totalAmount?.toFixed(2)}</p>
        </div>
        <div className='flex justify-around py-10'>
          <div className='border-0 rounded-full p-10 m-2 text-lg bg-green-400'>
            <p>Product</p>
            <p>{productInfo && productInfo?.products?.length}</p>
          </div>
          <div className='border-0 rounded-full p-10 m-2 text-lg bg-yellow-400'>
            <p>Orders</p>
            <p>{orderInfo && orderInfo?.orders?.length}</p>
          </div>
          <div className='border-0 rounded-full p-10 m-2 text-lg bg-orange-400'>
            <p>Users</p>
            <p>{userInfo && userInfo?.users?.length}</p>
          </div>
        </div>
        <div className='grid grid-cols-3 py-16'>
          <div className='col-span-2'>
            <LineChart />
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
