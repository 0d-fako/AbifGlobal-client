import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';



function Offersect() {
    const [offers, setOffers] = useState([]);
    const handleShare = (place, price, duration, discount) => {
        if (navigator.share) {
            navigator.share({
                title: place,
                amount: price,
                time: duration,
                bonus: discount,
                url: window.location.href,
            })
                .then(() => alert("Package shared successfully!"))
                .catch((error) => console.error("Error sharing package:", error));
        } else {
            alert("Sharing is not supported in this browser.");
        }
    };

    const getOffers = async ()=> {
        try{
           const response = await axios.get('https://abifglobal-1.onrender.com/offer/alloffers');

            const offer = response.data;
            offer && setOffers(offer);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
      getOffers();
    }, [])
    
    return (
        <div>
            
            <div className="mt-10 py-12 box-border">
                <div className="text-center">
                    <h3 className="text-gray-600 font-semibold tracking-wide">BEAUTIFUL TRAVELS</h3>
                    <h2 className="font-extrabold md:text-4xl text-3xl font-serif text-yellow-600">Our Popular Destinations</h2>
                </div>
                <div className='mt-10 w-full h-max flex items-center justify-evenly gap-2 flex-wrap'>
                    {
                        offers.map((offer, index)=>{
                            return(
                            index <= 2 && (
                                <div key={index} className='md:w-[30%] w-full md:h-[90vh] h-max overflow-hidden shadow-md shadow-black my-8'>
                                    <div className='w-full h-[40vh] overflow-hidden'>
                                        <img className='w-full h-[40vh] object-cover scale-100 transition-all duration-700 hover:scale-105' src={offer.imgurl} alt="" />
                                    </div>
                                    <div className='p-5 box-border h-1/4'>
                                        <h4 className='text-3xl my-2 font-bold'>{offer.title}</h4>
                                        <h5 className='text-red-600 text-xl font-semibold'>&#8358;{offer.price} <span className='text-gray-600'>/ person</span> </h5>
                                        <p className='font-medium text-gray-700'>Package:</p>
                                        <ul className='flex items-center justify-start gap-3'>
                                            {
                                            
                                                offer.package && offer.package.length > 0 && offer.package.map((pack, index)=>{
                                                    <li key={index} className='bg-red-600 px-3 py-1 rounded-md text-white text-sm'>{pack}</li>
                                                }
                                            )
                                            }
                                            {
                                                offer.duration && (<li className='bg-red-600 px-3 py-1 rounded-md text-white text-sm'>{offer.duration}</li>)
                                            }
                                            {
                                                offer.discount > 0 && <li className='bg-red-600 px-3 py-1 rounded-md text-white text-sm'>{offer.discount}% discount</li>
                                            }
                                        </ul>
                                        <div className='mt-4 flex items-center justify-start gap-3'>
                                                <Link to={'/contact'} className='text-blue-900 font-semibold'><FontAwesomeIcon icon="fa-regular fa-hand-point-right" /> Book Now</Link> 
                                                <button className='text-blue-900 font-semibold' onClick={()=>{handleShare(offer.title, offer.price, offer.duration, offer.discount)}}><FontAwesomeIcon icon="fa-solid fa-share" /> Share</button>
                                            </div>
                                    </div>
                                    
                                </div> 
                            )
                        )
                        })
                    }
                    <div>
                        <Link to={'/ouroffers'}><FontAwesomeIcon icon="fa-solid fa-caret-right" className='md:text-lg md:text-red-600 md:animate-ping ' /></Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Offersect;