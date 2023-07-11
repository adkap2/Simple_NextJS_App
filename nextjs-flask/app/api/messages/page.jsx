'use client'

import React, { useState } from 'react';

export default function Page() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    console.log('Form submitted');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);

    // Create an object with the form data
    const formData = {
      firstName,
      lastName
    };

    // Send the data to the server
     fetch('https://jyu5m09x13.execute-api.us-west-1.amazonaws.com/prod/messages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server if needed
        console.log(data);
      })
      .catch(error => {
        // Handle any error that occurred during the request
        console.error(error);
      });

  };
  const handleReset = () => {
    setFirstName('');
    setLastName('');
  };

  return (
    <form className="flex items-center justify-center h-screen" onSubmit={handleSubmit}>
        <div className="flex flex-col">
            <label htmlFor="fname" className="text-gray-700 font-bold">
                First name:
            </label>
            <input
                type="text"
                id="fname"
                name="fname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
        </div>
        <div className='flex flex-col'>
            <label htmlFor="lname" className="text-gray-700 font-bold">
                Last name:
            </label>
            <input
                type="text"
                id="lname"
                name="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
        </div>
        <div className='flex-col'>
            <br/>
            <button type="submit" 
                className="bg-blue-500 hover:bg-blue-700
                 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
            <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-0">                Reset
            </button>
        </div>
    </form>

  );

}