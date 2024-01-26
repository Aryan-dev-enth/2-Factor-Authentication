'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';

const Page = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const date = new Date();
  const app_url = process.env.NEXT_PUBLIC_APP_URL;

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${app_url}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "username": username,
          "password": password,
          "password_confirmation": confirmPassword,
          "createdAt": date,
          "dob": birthdate,
          "gender": gender
        }),
      });
  
      const data = await response.json();
      alert(data.message);
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200'>
      <div className="form w-4/5 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 h-4/5 shadow-2xl rounded-3xl relative flex flex-col lg:flex-row justify-between p-8 bg-white">
        <div className="left lg:w-3/5 relative rounded-3xl overflow-hidden mb-4 lg:mb-0 mr-0 lg:mr-8">
          <Image src={'/6322675.jpg'} alt="Your Image Alt Text" layout="fill" objectFit="cover" />
        </div>
        <div className="right lg:w-2/5 bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-xl lg:text-2xl font-bold mb-4">Welcome, register below</h1>
          <p className="text-gray-600 mb-6">Please register to continue</p>
          <input
            className="w-full p-2 mb-4 border rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="date"
            placeholder="Birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <div className="mt-2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700"></label>
            <select
              id="gender"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <br />
          <div className='w-full flex flex-col lg:flex-row justify-around items-center'>
            <a className="text-blue-500 text-sm mb-4 lg:mb-0" href="/">Forgot Password?</a>
            <Button content={'Sign Up'} onClick={handleFormSubmit}/>
          </div>
          <br />
          <div className="flex items-center mb-6">
            <div className="flex-grow bg-gradient-to-r from-gray-300 to-gray-500 h-0.5"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow bg-gradient-to-l from-gray-300 to-gray-500 h-0.5"></div>
          </div>
          <div className="text-center cursor-pointer transition-transform duration-300 hover:scale-110 login-section bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full py-2 px-4 text-md lg:text-xl font-bold mb-4">
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
