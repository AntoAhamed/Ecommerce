import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../features/productSlice'
import { Button } from '@mui/material'

function CreateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const dispatch = useDispatch()
    const { isLoading, productInfo, error, success, message } = useSelector((state) => state.product)

    const handleImageChange = (e) => {
        try {
            const files = Array.from(e.target.files);

            setImages([]);
            setImagesPreview([]);

            files.forEach((file) => {
                const reader = new FileReader();

                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImagesPreview((old) => [...old, reader.result]);
                        setImages((old) => [...old, reader.result]);
                    }
                };

                reader.readAsDataURL(file);
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const productData = {
            name,
            price,
            description,
            category,
            stock,
        }

        productData.images = images

        dispatch(createProduct(productData))

        if (success) {
            alert("Product Added Successfully")

            setName('')
            setPrice('')
            setDescription('')
            setCategory('')
            setStock('')
            setImages([])
            setImagesPreview([])
        }
    }

    return (
        <div className='grid grid-cols-5'>
            <Sidebar />
            <div className='col-span-4'>
                <div className='flex flex-col items-center border my-6 mx-44 py-10'>
                    <p className='text-3xl font-semibold'>Create Product</p>
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <p className="text-lg">Name</p>
                            <input type="text" className="border-2 w-full p-2" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <p className="text-lg">Price</p>
                            <input type="text" className="border-2 w-full p-2" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <p className="text-lg">Description</p>
                            <input type="text" className="border-2 w-full p-2" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <p className="text-lg">Category</p>
                            <input type="text" className="border-2 w-full p-2" value={category} onChange={(e) => setCategory(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <p className="text-lg">Stock</p>
                            <input type="text" className="border-2 w-full p-2" value={stock} onChange={(e) => setStock(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <div className='text-center'>
                                {imagesPreview.map((image, index)=>(
                                    <img key={index} src={image} alt='Product' width={'12%'} />
                                ))}
                            </div>
                            <div>
                                <p className="text-lg">Image</p>
                                <input type="file" accept='.png, .jpg, .jpeg' multiple className="border-2 w-full p-2" onChange={handleImageChange} required />
                            </div>
                        </div>

                        <div className='grid mb-3'>
                            <Button variant='contained' type="submit">Create</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct
