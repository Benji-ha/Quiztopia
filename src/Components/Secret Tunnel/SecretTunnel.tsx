import { useEffect } from "react"

export default function SecretTunnel() {
    // vi hämtar token från sessionstorage
    // se om tpken är legit genom att anropa API_URL/auth/account
    useEffect(() => {
        const checkToken = async () => {
            let token: string = '';
            token = sessionStorage.getItem('token') || '';
            // check på om det är en tom sträng 
            if (token.length > 0) {
                try {
                    const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`
                        }
                    });
                    const data = await response.json();
                    console.log(data);
                } catch (error: any) {
                    console.error(error);
                }
            }
        };
        checkToken();
    }, []);
  return (
    <div>SecretTunnel</div>
  )
}
