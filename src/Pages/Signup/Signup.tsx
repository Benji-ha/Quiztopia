import React, { useState } from "react"


type User = {
    username: string;
    password: string;
};

export default function Signup() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();


        const userData: User = {username, password};
        try {
            const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Något gick galet');
            }
            const data = await response.json();
            console.log(data);
            setMessage("Account created successfully!");
        } catch (error: any) {
            console.error(error);
            setMessage("Something went wrong. Please try again.");
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Användarnamn:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                ></input>
            </label>
            <label>
                Lösenord:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                ></input>
            </label>
            <button type="submit">Skapa konto</button>
        </form>
        {message && <p>{message}</p>}
    </div>
  )
}
