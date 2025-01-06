import React from 'react'
import myself from '../../assets/myself.jpg'

function About() {
    return (
        <div className='lg:px-32 md:px-16 lg:py-16 md:py-8 p-4'>
            <div className='grid lg:grid-cols-2 grid-cols-1 shadow-gray-500 shadow-lg p-4'>
                <div className='h-screen bg-blue-100 flex flex-col justify-center items-center p-4'>
                    <img src={myself} alt='myself' width={'50%'} className='mb-5 rounded-full' />
                    <h1 className='lg:text-3xl text-2xl font-bold mb-4'>About Us</h1>
                    <div className='lg:text-lg'>
                        <p className='mb-2'><span className='font-semibold text-3xl italic'>H</span>ello everyone. I am Md. Nazirul Mobin Ahamed (B.Sc. in CSE) and this is a fully functional MERN stack ecommerce web application, developed by me.</p>
                        <p className='mb-2'>If you have any questions or feedback, feel free to reach me at <span className='font-semibold'>mdnazirulmobinahamed@gmail.com</span>.</p>
                        <p>You can also DM me on my <a href='https://www.linkedin.com/in/nazirulmobin' target='_blank' className='font-semibold underline underline-offset-1 hover:text-blue-800'>LinkedIn</a>.</p>
                    </div>
                </div>
                <div className='h-screen bg-orange-100 flex justify-center items-center'>
                    <p className='lg:text-5xl md:text-4xl text-3xl font-semibold italic'>Thanks for visiting...</p>
                </div>
            </div>
        </div>
    )
}

export default About
