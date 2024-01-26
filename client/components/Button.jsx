
import React from 'react'

const Button = (props) => {
    const {content, onClick}=props;
  return (
    <button onClick={onClick} className='bg-[#FFCE31]  h-12 w-auto px-4 py-2 text-black transition-transform duration-300 hover:scale-110 rounded-3xl text-sm'>{content}</button>
)
}

export default Button
