import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import logo from "../images/logo.png";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        try {
            axios.post('https://abifglobal-1.onrender.com/admin/login', {email, password})
            .then(res => {
                console.log(res);
                    const token = res.data.token;
                    const role = res.data.role;

                    Cookies.set('role', role);
                    Cookies.set('authToken', token);

                    setMessage('successfully logged in');

                    navigate('/dashboard');
                    
                
            }).catch(err=>console.log(err))
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-[100vh]">
            <div className=" bg-red-800 rounded-xl p-5 box-border md:w-1/3 w-full md:mx-auto mx-5">
                <div className="text-center">
                    <img src={logo} alt="Abif Global Icon" className="w-[80px] h-auto md:w-[90px]"/>
                    <h2 className="text-center text-white text-lg mb-4 mt-0">Backoffice <span className="text-yellow-400">Sign in</span></h2>

                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-start">
                    <span className="text-white text-xs">{message}</span>
                    <input className="w-full rounded-md p-2 my-2 bg-white"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                    <input className="w-full rounded-md p-2 my-2 bg-white"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                    <div className="flex flex-col items-center justify-center w-full my-3">
                        <button type="submit" className="bg-white text-amber-900 py-1 px-3 rounded-md">Login</button>
                        <p className="text-white text-sm">
                        <Link className="text-lg underline text-yellow-400" to={'/register'}>Sign up</Link> if you don&apos;t have an account?
                        </p>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default Login;