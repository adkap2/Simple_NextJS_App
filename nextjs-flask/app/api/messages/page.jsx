'use client'

import React, { useState } from 'react';
import Link from 'next/link';


export default function Page() {
  const [message, setMessage] = useState('');
  const [responseMessages, setResponseMessages] = useState([]);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(-1);


  // const [lastName, setLastName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    console.log('Message submitted');
    console.log('Message:', message);
    // console.log('Last Name:', lastName);

    // Create an object with the form data
    const formData = {
      message,
      // lastName
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
    setMessage('');
    // setLastName('');
  };

  const handleDeleteMessage = (indexString) => {
    // Send a delete request to the server for the specified message
    const index = parseInt(indexString.split("-")[1]);
    console.log('index:', index);
    const messageToDelete = responseMessages[index].message;
    console.log('messageToDelete:', messageToDelete);
    const messageKey = responseMessages[index].messageId;
    console.log('messageKey:', messageKey);
    fetch(`https://jyu5m09x13.execute-api.us-west-1.amazonaws.com/prod/messages/${messageKey}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted message from the state
        const updatedMessages = responseMessages.filter(message => message.messageId !== messageKey);
        setResponseMessages(updatedMessages);
      })
      .catch(error => {
        console.error(error);
      });
  };


  const fetchMessages = () => {
    fetch('https://jyu5m09x13.execute-api.us-west-1.amazonaws.com/prod/messages')
      .then(response => response.json())
      .then(data => {
        // Filter out empty messages
        const nonEmptyMessages = data.filter(response => response.message.trim() !== '');
        
        // Update the state with the non-empty response messages
        console.log('Response messages:', nonEmptyMessages);
        setResponseMessages(nonEmptyMessages);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="mb-0 ">
          <label htmlFor="message" className="text-gray-700 font-bold">
            Your Message:
          </label>
          </div>
          <input
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Message
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-2"
          >
            Reset
          </button>
      </form>
      <Link href="/" passHref>
        <button className="bg-red-200 hover:bg-red-700 font-bold py-2 px-4 rounded">
          <span>Go Back</span>
        </button>
      </Link>
      {/* Fetch all response messages */}
            <div className="mt-4">
        <button
          onClick={fetchMessages}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Get all Response Messages
        </button>
      </div>
      {/* Display the response messages */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3">
          {responseMessages.map((response, index) => (
            <div
              key={index}
              id = {`message-${index}`}
              className="bg-gray-100 p-2 rounded-md shadow-md w-64 text-sm text-gray-800 mb-4"
            >
              {/* <button>{response.message}
                  onClick={() => handleDeleteMessage(index)}
                  className="absolute top-1 right-1 text-red-600 font-bold"</button> */}
                   <button onMouseEnter={() => setHoveredButtonIndex(index)}
                  onMouseLeave={() => setHoveredButtonIndex(-1)}
                  onClick={() => handleDeleteMessage(`response-${index}`)}
                  className={`flex items-center justify-center w-full h-full 
                  ${hoveredButtonIndex === index ? 'bg-red-500' : 'bg-gray-300'}
                   hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                >
                  {hoveredButtonIndex === index ? 'Delete' : response.message}
                </button>
            </div>
          ))}
      </div>
    </div>
  );
}
