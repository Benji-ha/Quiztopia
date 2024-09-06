import LoginForm from '../../Components/Log in/LoginForm'
import { useNavigate } from 'react-router-dom'
import './Home.css'


export default function Home() {

    const navigate = useNavigate()

    function handleSignupSubmit() {
        navigate('/signup')
    }

    // function handleTunnel() {
    //     navigate('/tunnel')
    // }


  return (
    <div className='Home'>
      <h2 className='Home-header'>QUIZTOPIA!</h2>
      <main className='Home-main'>
        <LoginForm />
        <p>Don't have an account?</p>
        <button className='Signup-Button' onClick={handleSignupSubmit}>Sign up here</button>
        {/* <button onClick={handleTunnel}>SECRET Tunnel</button> */}
      </main>
    </div>
  )
}
