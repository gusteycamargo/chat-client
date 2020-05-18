import React, { useState } from 'react' 
import './styles.css';
import { IoIosChatboxes } from "react-icons/io";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="container-login">
            <div className="form-container">
                <IoIosChatboxes size={220}/>
                <form className="form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        className="input"
                        placeholder="Nome de usuário"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        type="password"
                        className="input"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>
                </form>
            </div>
           
        </div>
    )
}

export default Login;