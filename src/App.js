import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Ws from '@adonisjs/websocket-client';

function App() {
  

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const chat = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = Ws('ws://localhost:3333', {
      path: 'ws'
    })

    ws.current.connect();
   
    chat.current = ws.current.subscribe("chat");
    chat.current.on("message", (data) => {
      console.log('iniiiii');
    });
  }, []);

  function sendMessage() {            
    chat.current.emit("message", message);
    messages.push(message);
    console.log(messages);

    setMessage('');
  }




  return (
    <div className="App">
      
       <input type="text" 
              placeholder="Mensagem"
              value={message}
              name="Message"
              onChange={e => setMessage(e.target.value)}
        ></input>
        <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default App;
