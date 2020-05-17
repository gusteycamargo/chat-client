import React, { useEffect, useState } from 'react';
import './App.css';
import { connect, disconnect, subscribeToChat, sendMessage } from './services/socket';

function App() {
  

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    subscribeToChat(data => {
      const msg = data;
      msg["received"] = true;      
      setMessages([...messages, msg])
    });
  }, [messages]);

  function sendMessagea() {            
    sendMessage(message, username);
    setMessages([...messages, {message, username, received: false}]);
    setMessage('');
  }

  return (
    <div className="App">
      <div className="chat">
        {messages.map(content => ( 
          <div className={(content.received) ? "left" : "right"}>
            <div className={(content.received) ? "baloon baloon-sent" : "baloon"}>
              <p className="name">{content.username}</p>
              <p className="message">{content.message}</p>
            </div>
          </div>
          
        ))}
      </div>
        
      
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
