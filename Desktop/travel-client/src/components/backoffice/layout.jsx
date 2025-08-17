/* eslint-disable react/prop-types */
import { useState } from "react";
import Adminheader from './adminheader';
import Sidebar from './sidebar';


function Layout({ children }) {
    const [sideb , setSideb] = useState(false);
    
        const turnSidebar = ()=>{
            setSideb(!sideb);
        }
    
    return (
        <div className="flex items-start justify-center h-[100vh] overflow-hidden">
            <Sidebar sidebar={sideb} />
            <div className='md:w-4/5 w-full'>
                <Adminheader turnSidebar={turnSidebar} />
                   {children} 
            </div>
        </div>
    );
}

export default Layout;