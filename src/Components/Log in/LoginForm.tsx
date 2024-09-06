import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

type User = {
    username: string;
    password: string;
}

export default function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userData: User = { username, password };
        console.log('här är vi');
        const API_URL = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login";
        try {
            console.log(userData);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            console.log(response);
       if (response.ok && data.success) {
        console.log(data);
        sessionStorage.setItem('token', data.token);
        setMessage("Logged in successfully!");

        navigate('/mission-control');
      } else {

        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
        } catch (error: any) {
            console.error(error);
            setMessage("Login failed. Please try again.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Användarnamn:
                    <input
                        type="text"
                        className="login-input"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    ></input>
                </label>
                <label>
                    Lösenord:
                    <input
                        type="password"
                        className="login-input"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                </label>
                <button 
                    type="submit"
                    className="login-button"
                    >Logga in</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
