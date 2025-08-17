import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";
import logo from "./images/logo.png";

function Header() {
    const [menu, setMenu] = useState(false);
    return (
        <header className=" w-full py-2 md:py-4 cursor-pointer flex items-center justify-between md:justify-center">
            <nav className="hidden md:flex md:items-center gap-8 font-semibold text-lg text-white">
                <Link to={'/'} className="text-base transition-all duration-500 hover:text-amber-200">Home</Link>
                <Link to={'/about'} className="text-base transition-all duration-500 hover:text-amber-200">About Us</Link>
            </nav>
            <img src={logo} alt="Abif Global Icon" className="w-[80px] h-auto md:w-[120px] md:mx-14 mx-0"/>
            <nav className="hidden md:flex md:items-center gap-8 font-semibold text-lg text-white">
                <Link to={'/ouroffers'} className="text-base transition-all duration-500 hover:text-amber-200">Offers</Link>
                <Link to={'/contact'} className="text-base transition-all duration-500 hover:text-amber-200">Contact</Link>
            </nav>

            <FontAwesomeIcon icon="fa-solid fa-bars" className="block md:hidden! text-yellow-300 text-xl" onClick={()=>setMenu((prev)=>!prev)}/>

            <div className={`absolute top-[13vh] h-max p-5 z-50 box-border w-2/3 bg-yellow-500 right-0 flex flex-col items-start justify-center text-white transition-all duration-700 ${menu ? "translate-x-0" : "translate-x-[200%]"} `}>
                <Link to={'/'} className="my-2 text-lg transition-all duration-500 hover:text-amber-200">Home</Link>
                <Link to={'/about'} className="my-2 text-lg transition-all duration-500 hover:text-amber-200">About Us</Link>
                <Link to={'/ouroffers'} className="my-2 text-lg transition-all duration-500 hover:text-amber-200">Offers</Link>
                <Link to={'/contact'} className="my-2 text-lg transition-all duration-500 hover:text-amber-200">Contact</Link>
            </div>
        </header>
        
    );
}

export default Header;