/* eslint-disable react/prop-types */
import Cookies from 'js-cookie'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom';


function Sidebar({ sidebar }) {
    const role = Cookies.get('role');
    const token = Cookies.get('authToken');
    const navigate = useNavigate();

    const logOut = ()=>{
        Cookies.remove(role);
        Cookies.remove(token);

        navigate('/login');


    }
    return (
        <div className={`md:flex ${sidebar ? 'hidden' : 'flex absolute w-3/4 top-0 left-0 z-50'} md:w-1/5 md:static items-start flex-col justify-evenly h-[100vh] px-8 box-border bg-red-800`}>
                <h2 className="text-center text-white text-2xl font-serif font-extrabold">Role: {role}</h2> 
                <div className='flex flex-col items-start justify-center'>
                    <Link to={'/offers'} className='my-2 text-white'>Offers</Link>
                    <Link to={'/createoffer'} className='my-2 text-white'>New Offer</Link>
                    <Link to={'/addaboutus'} className='my-2 text-white'>About Us Content</Link>
                    <Link to={'/customerreview'} className='my-2 text-white'> Review</Link>
                    <Link to={'/addheroimage'} className='my-2 text-white'>Image Management</Link>
                    <Link to={'/inquiries'} className='my-2 text-white'>Inquiry Management</Link>
                </div>
                <button onClick={()=>logOut()} className='bg-white text-red-600 p-2'>Logout</button> 
                
        </div>
    );
}

export default Sidebar;