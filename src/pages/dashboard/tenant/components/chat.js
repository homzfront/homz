"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = io(); // No need to pass the server URL

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', { text: message });
      setMessage('');
    }
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="username">{msg.username || 'Anonymous'}:</span>{' '}
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
