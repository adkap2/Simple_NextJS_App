'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [message, setMessage] = useState('');
  const [responseMessages, setResponseMessages] = useState([]);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(-1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = { message };
      const response = await fetch('https://jyu5m09x13.execute-api.us-west-1.amazonaws.com/prod/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to post message');
      }

      // Clear the message input
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMessage = async (messageKey) => {
    try {
      const response = await fetch(`https://jyu5m09x13.execute-api.us-west-1.amazonaws.com/prod/messages/${messageKey}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      // Remove the deleted message from the state
      const updatedMessages = responseMessages.filter((message) => message.messageId !== messageKey);
      setResponseMessages(updatedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://jyu5m09x13.execute-api.us-west-1.amazonaws.com/prod/messages');

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      const nonEmptyMessages = data.filter((message) => message.message.trim() !== '');
      setResponseMessages(nonEmptyMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const hideResponseMessages = () => {
    setResponseMessages([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="mb-0">
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Post Message
        </button>
        <button
          type="button"
          onClick={() => setMessage('')}
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

      <div className="mt-4">
        <button
          onClick={fetchMessages}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Get all Messages
        </button>
        <button onClick={hideResponseMessages} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Hide all Messages
        </button>
      </div>

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3">
        {responseMessages.map((response, index) => (
          <div
            key={index}
            id={`message-${index}`}
            className="bg-gray-100 p-2 rounded-md shadow-md w-64 text-sm text-gray-800 mb-4"
          >
            <button
              onMouseEnter={() => setHoveredButtonIndex(index)}
              onMouseLeave={() => setHoveredButtonIndex(-1)}
              onClick={() => handleDeleteMessage(response.messageId)}
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
