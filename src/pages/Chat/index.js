import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import { connect, disconnect, subscribeToChat, sendMessage } from '../../services/socket';

function Chat() {
  
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);
  
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

  function sendMessagea(e) { 
    e.preventDefault()           
    sendMessage(message, username);
    setMessages([...messages, {message, username, received: false}]);
    setMessage('');
  }

  return (
    <div className="App">
      <div className="chat">
        {(messages.length <= 0) && 
          <div className="ntg">
            <p>Sem mensagens ainda!</p>
          </div>
        }
        {messages.map(content => ( 
          <div className={(content.received) ? "left" : "right"}>
            <div className={(content.received) ? "baloon baloon-sent" : "baloon"}>
              <p className="name">{content.username}</p>
              <p className="message">{content.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
        
      
      <div className="inputs">
        <form onSubmit={sendMessagea}>
          <input type="text" 
                  className="username"
                  placeholder="Username"
                  value={username}
                  name="Username"
                  onChange={e => setUsername(e.target.value)}
            ></input>
          
          <input type="text" 
                  className="message"
                  placeholder="Mensagem"
                  value={message}
                  name="Message"
                  onChange={e => setMessage(e.target.value)}
            ></input>
            <button type="submit" className="hidden">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
