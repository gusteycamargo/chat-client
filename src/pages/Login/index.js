import React, { useState } from 'react' 
import './styles.css';
import { IoIosChatboxes } from "react-icons/io";
import api from '../../services/api';
import { login } from '../../services/auth';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/lib/Spinner/Spinner.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Login({ history }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const MySwal = withReactContent(Swal);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password) {
            MySwal.fire('Oops...', 'Parece que você não preencheu todos os campos', 'error');
        } else {
            try {
                setIsLoading(true);
                const response = await api.post("/sessions", { username, password });
                console.log(response);
                
                login(response.data.token);
                
                history.push("/chat");
            } catch (err) {
                console.log(err);
                
                MySwal.fire('Oops...', 'Nome de usuário ou senha incorreta', 'error');
            }
            setIsLoading(false);
        }
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
                    <button className="button" type="submit">
                        Login
                        <Spinner className="ml-2" color="#7c119c" size={16} speed={0.5} animating={isLoading} />
                    </button>
                </form>
            </div>
           
        </div>
    )
}

export default Login;