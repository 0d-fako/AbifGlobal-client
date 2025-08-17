import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'



function Offers() {
    const [destination, setDestination] = useState('');
    const [min_price, setMin_price] = useState(0);
    const [max_price, setMax_price] = useState(0);
    const [duration, setDuration] = useState('');
    const [offers, setOffers] = useState([]);
    const [filteredoffers, setFilteredoffers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const getOffers = async () => {
        try {
            const response = await axios.get('https://abifglobal-1.onrender.com/offer/alloffers');
            
            const offer = response.data;
            console.log(response);
            if (offer) {
                setOffers(offer);
            }
        } catch {
            setError('Try again! An error occurred');
        }
    };
    
    const handleShare = (place, price, duration, discount) => {
        if (navigator.share) {
            navigator.share({
                title: place,
                text: `Price: ${price}, Duration: ${duration}, Discount: ${discount}`,
                url: window.location.href,
            })
                .then(() => alert("Package shared successfully!"))
                .catch((error) => setError("Error sharing package:", error));
        } else {
            alert("Sharing is not supported in this browser.");
        }
    };
    
    const handleSearchFilter = async (destination, min_price, max_price, duration) => {
        const queryParams = new URLSearchParams();
        if (destination) queryParams.append('destination', destination.trim().replace(/\s+/g, ' '));
        if (min_price && !isNaN(min_price)) queryParams.append('min_price', min_price.trim().replace(/\s+/g, ' '));
        if (max_price && !isNaN(max_price)) queryParams.append('max_price', max_price.trim().replace(/\s+/g, ' '));
        if (duration) queryParams.append('duration', duration.trim().replace(/\s+/g, ' '));
    
        try {
            const searchresponse = await axios.get(`https://abifglobal-1.onrender.com/offer/search?${queryParams.toString()}`);
            const respdata = searchresponse.data;
            
            if(respdata){
                setFilteredoffers(searchresponse.data);
            }else{
                setError('Cannot find word');
            }
        } catch {
            setError('An error occurred searching for that word.Try again');
        }
    };


    useEffect(() => {
        getOffers();
    }, []);

    const getOfferdetails = (offerId)=>{
        Cookies.set('offerdet', offerId);

        navigate('/offerdetails')
    }

    return (
        <div>
            <div className="relative w-full md:w-full md:h-[30vh] h-[15vh] bg-red-800">
                <div className="relative top-0 w-full md:h-[30vh] h-[15vh] md:px-12 px-4 py-5 box-border z-40">
                    <Header />
                </div>
            </div>
            <div className=" md:px-14 mt-8 px-6 py-5 box-border w-full md:h-[20vh] h-max">
                    <div className="w-full flex md:flex-row flex-col items-center justify-center gap-1">
                        <input type="text" onChange={(e)=>setDestination(e.target.value)} value={destination} placeholder="Destination" className=" p-2 border-2 border-red-600 caret-yellow-600"/>
                        <label htmlFor="min">Min price: </label><input id="min" type="number" min={0} onChange={(e) => setMin_price(e.target.value)} value={min_price} placeholder="min price" className=" p-2 border-2 border-red-600 caret-yellow-600"/>
                        <label htmlFor="max">Max price: </label><input id="max"  type="number" min={0} onChange={(e) => setMax_price(e.target.value)} value={max_price} placeholder="max price" className=" p-2 border-2 border-red-600 caret-yellow-600" />
                        <input type="text" onChange={(e)=>setDuration(e.target.value)} value={duration} placeholder="Duration e.g 2 weeks" className=" p-2 border-2 border-red-600 caret-yellow-600"/>
                        <button onClick={()=>handleSearchFilter(destination, min_price, max_price, duration)} className="py-3 px-4 border-2 border-red-600 text-sm text-white bg-red-600">Search <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                    </div>
                </div>
                <p className="text-red-800">{error}</p>
                <div className='mt-10 w-full h-max flex items-center justify-evenly gap-2 flex-wrap'>
                    {
                        
                            filteredoffers.length > 0 ?
                                (
                                    filteredoffers.map((offer, index)=>{
                                        return(
                                            <div key={index} className='md:w-[30%] w-[48%] md:h-[80vh] h-[70vh] overflow-hidden shadow-md shadow-black my-8'>
                                                <div className="w-full md:h-[40vh] h-[20vh] overflow-hidden">
                                                    <img className='w-full md:h-full h-full object-cover scale-100 transition-all duration-700 hover:scale-105' src={offer.imgurl} alt="" />
                                                </div>
                                                <div className='md:p-5 p-3 box-border h-1/4'>
                                                    <h4 className='md:text-3xl text-xl my-2 font-bold'>{offer.title}</h4>
                                                    <h5 className='text-red-600 md:text-xl text-lg font-semibold'>&#8358;{offer.price} <span className='text-gray-600'>/ person</span> </h5>
                                                    <p className='font-medium text-gray-700'>Package:</p>
                                                    <ul className='flex items-center justify-start gap-3'>
                                                        {
                                                        
                                                            offer.package && offer.package.length > 0 && offer.package.map((pack, index)=>{
                                                                <li key={index} className='bg-red-600 md:px-3 px-1 py-1 rounded-md text-white text-xs'>{pack}</li>
                                                            }
                                                        )
                                                        }
                                                        {
                                                            offer.duration && (<li className='bg-red-600 md:px-3 px-1 py-1 rounded-md text-white text-xs'>{offer.duration}</li>)
                                                        }
                                                        {
                                                            offer.discount > 0 && <li className='bg-red-600 md:px-3 px-1 py-1 rounded-md text-white text-xs'>{offer.discount}% discount</li>
                                                        }
                                                    </ul>
                                                    <div className='mt-4 flex items-center justify-start gap-3'>
                                                        <Link to={'/contact'} className='text-blue-900 font-semibold'><FontAwesomeIcon icon="fa-regular fa-hand-point-right" /> Book</Link> 
                                                        <button className='text-blue-900 font-semibold' onClick={()=>{handleShare(offer.title, offer.price, offer.duration, offer.discount)}}><FontAwesomeIcon icon="fa-solid fa-share" /> Share</button>
                                                    </div>
                                                    <button onClick={()=>getOfferdetails(offer._id)} className='bg-red-600 px-3 py-1 rounded-md text-white text-xs'>More Details</button>
                                                </div>
                                            </div> 
                                        )
                                    })
                                ):
                            (
                                offers.map((offer, index)=>{
                                    return(
                                        <div key={index} className='md:w-[30%] w-[48%] md:h-[90vh] h-max overflow-hidden shadow-md shadow-black my-8'>
                                            <div className="w-full md:h-[40vh] h-[20vh] overflow-hidden">
                                                <img className='w-full md:h-[40vh] h-[20vh] object-cover scale-100 transition-all duration-700 hover:scale-105' src={offer.imgurl} alt="" />
                                            </div>
                                            <div className='md:p-5 p-3 box-border h-1/4'>
                                                <h4 className='md:text-2xl text-xl my-2 font-bold'>{offer.title}</h4>
                                                <h5 className='text-red-600 text-lg font-semibold'>&#8358;{offer.price} <span className='text-gray-600'>/ person</span> </h5>
                                                <p className='font-medium text-gray-700'>Package:</p>
                                                <ul className='flex items-center justify-start gap-3'>
                                                    {
                                                    
                                                        offer.package && offer.package.length > 0 && offer.package.map((pack, index)=>{
                                                            <li key={index} className='bg-red-600 md:px-3 px-1 py-1 rounded-md text-white text-xs'>{pack}</li>
                                                        }
                                                    )
                                                    }
                                                    {
                                                        offer.duration && (<li className='bg-red-600 md:px-3 px-1 py-1 rounded-md text-white text-xs'>{offer.duration}</li>)
                                                    }
                                                    {
                                                        offer.discount > 0 && <li className='bg-red-600 md:px-3 px-1 py-1 rounded-md text-white text-xs'>{offer.discount}% discount</li>
                                                    }
                                                </ul>
                                                <div className='mt-4 flex items-center justify-start gap-3'>
                                                    <Link to={'/contact'} className='text-blue-900 font-semibold'><FontAwesomeIcon icon="fa-regular fa-hand-point-right" /> Book</Link> 
                                                    <button className='text-blue-900 font-semibold' onClick={()=>{handleShare(offer.title, offer.price, offer.duration, offer.discount)}}><FontAwesomeIcon icon="fa-solid fa-share" /> Share</button>
                                                </div>
                                                <button onClick={()=>getOfferdetails(offer._id)} className='bg-red-600 px-3 py-1 rounded-md text-white text-xs'>More Details</button>
                                            </div>
                                            
                                        </div> 
                                    )
                                })
                            )
                        
                    }
                </div>
            
            <Footer />
        </div>
    );
}

export default Offers;