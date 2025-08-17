import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../images/logo.png";
 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        try {
            axios.post('https://abifglobal-1.onrender.com/admin/register', {name, email, password, role})
            .then(result => {
                console.log(result);
                if(result.status === 201){
                    setMessage('Successfully registered');

                    setTimeout(() => {
                        navigate('/login');
                    }
                    , 1000);
                }
            })
            .catch(error=> console.log(error));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-[100vh]">
            <div className=" bg-red-800 rounded-xl p-5 box-border md:w-1/3 w-full md:mx-auto mx-5">
                <div className="text-center">
                    <img src={logo} alt="Abif Global Icon" className="w-[80px] h-auto md:w-[90px]"/>
                    <h2 className="text-center text-white text-lg mb-4 mt-0">Backoffice <span className="text-yellow-400">Sign up</span></h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-start">
                    <span className="text-white text-xs">{message}</span>
                    <input className="w-full rounded-md p-2 my-2 bg-white"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
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
                    <select value={role} onChange={(e) => setRole(e.target.value)} required className="w-full rounded-md p-2 my-2 bg-white">
                        <option value="">Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div className="flex flex-col items-center justify-center w-full my-3">
                        <button type="submit" className="bg-white text-amber-900 py-1 px-3 rounded-md">Register</button>
                        <p className="text-white text-sm">
                        <Link className="text-lg text-yellow-400 underline" to={'/login'}>Sign in</Link> if you have an account already.
                        </p>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default Register;
