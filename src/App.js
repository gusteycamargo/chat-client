import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Ws from '@adonisjs/websocket-client';
import { connect, disconnect, subscribeToChat, sendMessage } from './services/socket';

function App() {
  

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const chat = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    subscribeToChat(data => setMessages([...messages, data]));
  }, [messages]);

  function sendMessagea() {            
    sendMessage(message, username);
    console.log(messages);

    setMessage('');
  }

  return (
    <div className="App">
      <ul>
        {messages.map(content => (
          <li>Nome: {content.username} - mensagem: {content.message}</li>
        ))}
      </ul>
      <input type="text" 
              placeholder="Username"
              value={username}
              name="Username"
              onChange={e => setUsername(e.target.value)}
        ></input>
       
       <input type="text" 
              placeholder="Mensagem"
              value={message}
              name="Message"
              onChange={e => setMessage(e.target.value)}
        ></input>
        <button onClick={sendMessagea}>Enviar</button>
    </div>
  );
}

export default App;
