'use client'
import React from 'react'
import Button from './Button'
import Image from 'next/image'
import { useState } from 'react'

const Hero = () => {
    const [email, setEmail] = useState('');

    return (
        <div className="hero w-full h-3/4 my-12  flex items-center justify-around">
            <div className="left w-6/12 h-full  ml-36  pl-32 py-36">
                <h1 className='text-6xl font-bold my-7'>
                    Welcome to a
                    <br />
                    Sleek, User-
                    <br />
                    Friendly
                    <br />
                    {email}
                    Experience
                </h1>
                <h4 className='font-sans font-thin text-lg mb-4'>
                    Join our global community of savvy users. Experience the efficiency of
                    <br />
                    a well-designed software.
                    
                </h4>
                <div className='flex justify-start items-center'>
                    <input
                        type="text"
                        className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 mr-4 text-sm w-2/5'
                        placeholder='Enter your email'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <Button content={'Get Started'} />
                </div>

            </div>
            <div className="right w-6/12 h-full">
                <div className="back w-3/5 h-3/4 bg-[#FFF0BF] rounded-3xl mt-16 relative shadow-lg">
                    <div className="shadow-lg front w-4/5 h-full bg-red-100 rounded-3xl  absolute left-12 transition-transform duration-300 hover:scale-110 hover:cursor-pointer">
                        <Image
                            src='/4794658.jpg'
                            alt='Description of the image'
                            className='w-full h-full rounded-3xl'
                            layout='fill'
                            objectFit='cover'
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
