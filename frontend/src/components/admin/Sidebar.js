import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar(props) {
    const { active = '' } = props

    return (
        <div className='p-3 border-r lg:border-b-0 border-b shadow-lg w-full'>
            <p className='text-2xl font-semibold mb-6'>Admin Panel</p>
            <ul className="flex flex-col justify-around pl-10">
                <li className='mb-6'>
                    <Link className={`text-lg p-2 ${active === "dashboard" ? "border-blue-800 font-semibold border-b-2" : "hover:text-blue-500"}`} to="/admin-dashboard">Dashboard</Link>
                </li>
                <li className='mb-6'>
                    <Link className={`text-lg p-2 ${active === "products" ? "border-blue-800 font-semibold border-b-2" : "hover:text-blue-500"}`} to="/admin-products">All Products</Link>
                </li>
                <li className='mb-6'>
                    <Link className={`text-lg p-2 ${active === "create-products" ? "border-blue-800 font-semibold border-b-2" : "hover:text-blue-500"}`} to="/admin-create-product">Create Product</Link>
                </li>
                <li className='mb-6'>
                    <Link className={`text-lg p-2 ${active === "orders" ? "border-blue-800 font-semibold border-b-2" : "hover:text-blue-500"}`} to="/admin-orders">Orders</Link>
                </li>
                <li className='mb-6'>
                    <Link className={`text-lg p-2 ${active === "users" ? "border-blue-800 font-semibold border-b-2" : "hover:text-blue-500"}`} to="/admin-users">Users</Link>
                </li>
                <li className='mb-6'>
                    <Link className={`text-lg p-2 ${active === "reviews" ? "border-blue-800 font-semibold border-b-2" : "hover:text-blue-500"}`} to="/admin-reviews">Reviews</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
