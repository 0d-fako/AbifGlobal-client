/* eslint-disable react/prop-types */
import logo from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function Adminheader({ turnSidebar } ) {
    return (
        <div>
            <div className="flex items-center justify-between py-3 md:px-10 px-3 box-border">
                <img src={logo} alt="Abif Global Icon" className="w-[80px] h-auto md:w-[90px]"/>
                <FontAwesomeIcon icon="fa-solid fa-bars" className="text-red-800 text-xl md:hidden block" onClick={turnSidebar} />
            </div>
        </div>
    );
}

export default Adminheader;