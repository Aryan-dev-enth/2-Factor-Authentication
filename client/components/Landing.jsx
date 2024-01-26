'use client'
import React from 'react'

import Navbar from './Navbar'
import Hero from './Hero'
import Footer from './Footer'
import { useState } from 'react'
const Landing = () => {

  
  return (
    <div className='w-screen h-screen'>
        <Navbar isLogged={false}/>
        <div className='w-5/6 h-px bg-slate-300 ml-40 my-5'></div>
        <Hero/>
        <div className='w-5/6 h-px bg-slate-300 ml-40 my-5'></div>
        <Footer/>
    </div>
    
  )
}

export default Landing
