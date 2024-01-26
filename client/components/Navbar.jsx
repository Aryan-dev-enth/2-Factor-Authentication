'use client'
import React from 'react';
import Link from 'next/link';
import Button from './Button';

const Navbar = (prop) => {
  const {isLogged}=prop;
  return (
    <div className="main w-full h-24 flex justify-between items-center px-32 py-3">
      <div className="left">
        <h1 className='font-extrabold text-2xl hover:cursor-pointer'>
          <Link href="/">BrandX</Link>
        </h1>
      </div>
      <div className="center flex gap-5">
        <h4 className='text-sm font-light hover:cursor-pointer'>
          <Link href="/">Home</Link>
        </h4>
        <h4 className='text-sm font-light hover:cursor-pointer'>
          <Link href="/about">About</Link>
        </h4>
        <h4 className='text-sm font-light hover:cursor-pointer'>
          <Link href="/services">Services</Link>
        </h4>
        <h4 className='text-sm font-light hover:cursor-pointer'>
          <Link href="/contact">Contact</Link>
        </h4>
      </div>
      <div className="right">
        <Link href="/Register">
          {isLogged}
          <Button content={'Sign Up'} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
