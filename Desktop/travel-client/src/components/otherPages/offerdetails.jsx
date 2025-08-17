import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

function Offerdetails() {
    const id = Cookies.get('offerdet');
    const [offerdetail, setOfferdetail] = useState(null);
    const [error, setError] = useState('');

    const getOffer = async (id)=>{
        try {
            const offerresp = await axios.get(`https://abifglobal-1.onrender.com/offer/offer/${id}`);
            let rsp = offerresp.data.data;
            if(rsp){
                setOfferdetail(rsp);
            }else{
                setError('No offer found');
            }
        } catch (error) {
            console.log(error);
            setError('Oops! An error occurred. Try again');
        }
    }

    useEffect(()=>{
        getOffer(id);
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center my-16">
            <p>{error}</p>
            <Link to={'/ouroffers'} className="bg-red-600 text-yellow-300 py-2 px-3">{'<='} Back</Link>
            {
               offerdetail ? 
                            <div className="md:w-[70%] w-full h-max md:p-10 p-2 box-border shadow-md shadow-black rounded-lg flex md:flex-row flex-col items-start justify-between">
                                <div className="md:w-[55%] w-full md:h-auto h-[60vh]">
                                    <img src={offerdetail.imgurl} className="w-full md:h-auto h-full object-cover" alt="offer image" />
                                </div>
                                <div className="md:w-[40%] w-full">
                                    <h1 className="text-6xl text-red-700">{offerdetail.title}</h1>
                                    {
                                        offerdetail.discount === 0 ? (<p className="text-3xl mt-2.5">&#8358;{offerdetail.price}</p>) :
                                        <p className="text-3xl mt-2.5"><strike>&#8358;{offerdetail.price}</strike> &#8358;{offerdetail.newprice} <br /> 
                                        <span className="text-xl italic text-red-600">{offerdetail.discount}% discount</span></p>
                                    }
                                    <p className="mt-5 text-lg">Duration: <span className="text-red-600">{offerdetail.duration}</span></p>
                                    <ul className="my-5">
                                        <h3 className="text-xl">Description: </h3>
                                        <li>{offerdetail.description}</li>

                                        <h3 className="text-xl mt-8">Service: </h3>
                                        <li>{offerdetail.service || 'Nil'}</li>
                                    </ul>

                                    <Link to={'/contact'} className="bg-red-600 text-white py-2 px-3">Book Now</Link>
                                </div>
                            </div>
                :(
                    <h2>No details for this package</h2>
                )
            }
        </div>
    );
}

export default Offerdetails;