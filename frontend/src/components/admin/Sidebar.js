import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className='p-3 border-r'>
            <p className='text-2xl font-semibold mb-6'>Admin Panel</p>
            <div className='flex flex-col justify-center items-center'>
                <ul class="p-3">
                    <li className='mb-6'>
                        <Link className='text-lg' to="/admin-dashboard">Dashboard</Link>
                    </li>
                    <li className='mb-6'>
                        <Link className='text-lg' to="/admin-products">All Products</Link>
                    </li>
                    <li className='mb-6'>
                        <Link className='text-lg' to="/admin-create-product">Create Product</Link>
                    </li>
                    <li className='mb-6'>
                        <Link className='text-lg' to="/admin-orders">Orders</Link>
                    </li>
                    <li className='mb-6'>
                        <Link className='text-lg' to="/admin-users">Users</Link>
                    </li>
                    <li className='mb-6'>
                        <Link className='text-lg' to="/admin-reviews">Reviews</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
