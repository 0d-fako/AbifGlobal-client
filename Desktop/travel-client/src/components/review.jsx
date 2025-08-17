import { useState, useEffect } from "react";
import slide1 from './images/slider1.webp'
import axios from 'axios'


function Review() {
    const [currSlide, setCurrSlide] = useState(0);
    const [customerStories, setCustomerStories] = useState([]);


    const fetchCustomerStories = async () => {
        try {
            const response = await axios.get('https://abifglobal-1.onrender.com/customerreview/get');
            
            const resp = response.data;
            if(resp){
                setCustomerStories(resp);
            }
        } catch {
            console.log('An error occurred');
        }
    };
    useEffect(() => {
        fetchCustomerStories(); 
    }, []); 

    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrSlide((prev) => (prev + 1) % customerStories.length);
        }, 10000);
    
        return () => clearInterval(interval);
    }, [customerStories]);

    return (
        <div className='relative w-full h-[60vh] md:h-[70vh] mb-14' id="review">
            <img src={slide1} alt="" className="absolute top-0 w-full h-full object-cover brightness-50 z-20" />
            <div className="absolute top-0 md:w-1/2 w-full md:left-1/4 left-0 z-30 overflow-hidden flex flex-col items-center justify-center h-full">
                <h3 className="text-center text-yellow-400 text-4xl font-serif mb-4">Customer Stories</h3>
                <div className="relative w-full mt-2 h-1/3 flex items-center overflow-hidden ">
                {
                    customerStories.map((cs, index) => {
                    return (
                    <div key={index} className={`w-full h-full absolute flex flex-col items-center justify-center text-center transition-all duration-1000 ${index === currSlide ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                        <h3 className="text-white text-3xl">{cs.customer_name}</h3>
                        <div className="flex items-center justify-center">
                        {
                            Array.from({ length: 5 }, (_, i) => {
                                return (
                                    <span key={i} className={`text-lg ${i < cs.rating ? 'text-yellow-400' : 'text-gray-200'}`}>
                                        ★
                                    </span>
                                );
                            })
                        }
                        </div>
                        <p className="text-center mx-auto w-2/3 text-gray-200">{cs.comment}</p>
                    </div>

                    );})
                }
                </div>
            </div>
        </div>
    );
}

export default Review;