import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "./images/logo.png";


function Footer() {
    return (
        <div className="px-5 py-10 bg-red-800 grid grid-rows-3 md:items-start items-center md:grid-cols-3 md:px-12 md:h-[40vh] ">
            <div>
                <img src={logo} alt="Abif Global Icon" className="w-[80px] h-auto md:w-[120px] my-4"/>
                <a href="telto:+2348180538270" className=" text-yellow-300 text-sm transition-all duration-500 hover:text-white">+234 818 053 8270</a> <br />
                <a href="" className=" text-yellow-300 text-sm transition-all duration-500 hover:text-white">abifglobaltravelsandtours@gmail.com</a>
            </div>
            <div>
                <h4 className="text-white font-bold text-xl">Links</h4>
                <ul>
                    <li><Link to={'/'} className="text-gray-300 transition-all duration-500 hover:text-amber-200">Home</Link></li>
                    <li><Link to={'/about'} className="text-gray-300 transition-all duration-500 hover:text-amber-200">About Us</Link></li>
                    <li><Link to={'/ouroffers'} className="text-gray-300 transition-all duration-500 hover:text-amber-200">Offers</Link></li>
                    <li><Link to={'/contact'} className="text-gray-300 transition-all duration-500 hover:text-amber-200">Contact</Link></li>
                </ul>
            </div>
            <div className="md:mt-0 mt-3.5">
                <p className="text-gray-300">Join our <span className="font-bold text-lg text-white">ABIF<span className="text-yellow-300 italic">Global</span></span> community and connect
                with fellow travellers like you. Follow our social media pages to get amazing offers</p>
                <div className="flex items-center my-4 gap-3">
                    <a href="https://www.facebook.com/profile.php?id=100091414773571&mibextid=wwXIfr&rdid=bXOlqkJBDhbUs10H&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EsYFCYvFW%2F%3Fmibextid%3DwwXIfr#"><FontAwesomeIcon icon="fa-brands fa-facebook" className="text-white text-3xl" /></a>
                    <a href="https://instagram.com/Abif_global_travels"><FontAwesomeIcon icon="fa-brands fa-square-instagram"  className="text-white text-3xl"/></a>
                    {/* <a href="#"><FontAwesomeIcon icon="fa-brands fa-x-twitter"  className="text-white text-3xl"/></a> */}
                    {/* <a href="#"><FontAwesomeIcon icon="fa-brands fa-square-threads"  className="text-white text-3xl" /></a> */}
                </div>
            </div>

        </div>
    );
}

export default Footer;