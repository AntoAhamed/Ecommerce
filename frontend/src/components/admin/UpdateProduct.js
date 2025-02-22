import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, updateProduct } from '../../features/productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Button } from '@mui/material'

function UpdateProduct() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, productInfo, error } = useSelector((state) => state.product)

    const handleImageChange = (e) => {
        try {
            const file = e.target.files[0];

            const limit = 1 * 1024 * 1024;

            if (file && file.size > limit) {
                alert("File size exceeds.")
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setImage(reader.result); // Set Base64 string to image state
                }
            }
        } catch (e) {
            setImage('')
            console.log(e)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedData = {
            name,
            price,
            description,
            category,
            stock,
            image,
        }

        dispatch(updateProduct({ id, updatedData }))

        if (productInfo?.success) {
            alert("Product Updated Successfully")
            navigate('/admin-products')
        } else {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch])

    return (
        <div className='grid lg:grid-cols-5'>
            <Sidebar />
            <div className='lg:col-span-4 border-2 bg-gray-50 lg:mx-32 md:mx-16 lg:my-16 md:my-8 m-4 lg:px-32 md:px-16 px-4 lg:py-16 md:py-8 py-4'>
                <p className='lg:text-4xl text-2xl font-semibold mb-3 text-center'>Update Product</p>
                <form encType='multipart/form-data' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <p className="text-lg">Name</p>
                        <input type="text" className="border-2 w-full p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder={productInfo?.product?.name} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Price</p>
                        <input type="text" className="border-2 w-full p-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={`$${productInfo?.product?.price}`} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Description</p>
                        <input type="text" className="border-2 w-full p-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={productInfo?.product?.description} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Category</p>
                        <input type="text" className="border-2 w-full p-2" value={category} onChange={(e) => setCategory(e.target.value)} placeholder={productInfo?.product?.category} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-lg">Stock</p>
                        <input type="text" className="border-2 w-full p-2" value={stock} onChange={(e) => setStock(e.target.value)} placeholder={productInfo?.product?.stock} required />
                    </div>

                    <div className="mb-3">
                        <div className='text-center'>
                            <img src={image} alt='' width={'12%'} />
                        </div>
                        <div>
                            <p className="text-lg">Image</p>
                            <input type="file" accept='.png, .jpg, .jpeg' className="border-2 w-full p-2" onChange={handleImageChange} required />
                        </div>
                    </div>

                    <div className='grid mb-3'>
                        <Button variant='contained' type="submit">Update</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct
