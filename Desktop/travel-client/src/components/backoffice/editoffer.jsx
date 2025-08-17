import Layout from './layout';
import axios  from "axios";
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import Cookies from "js-cookie"


function Editoffer() {
    const offerid = Cookies.get('offerid');
    const [offer, setOffer] = useState({
        title: '',
        price: 0,
        service: '',
        discount: 0,
        newprice: 0,
        duration: '',
        imgurl: '',
        description: ''
    });
    const navigate = useNavigate();
    const token = Cookies.get('authToken');
    const [error, setError] = useState('');


    useEffect(() => {
      const fetchOffers = async (id)=>{
        try {
            const fetchresponse = await axios.get(`https://abifglobal-1.onrender.com/offer/offer/${id}`);

            const res = fetchresponse.data.data;
            if(res){
                setOffer(res);
            }else{
                setError('Error fetching offers!');
            }
        } catch {
            setError('Error fetching offers!');
        }
      }

      fetchOffers(offerid);
    }, [offerid])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOffer({ ...offer, [name]: value });
    };

    
      const handleDiscount = (e) =>{
        const disc = e.target.value;
        if(disc === 0){
            setOffer((prev)=>({...prev, newprice : 0}));

        }else{
            let a = disc / 100;
            let r = a * offer.price;
            let newpric =  offer.price - r ;
            setOffer((prev)=>({...prev, newprice : newpric}));
        }
        setOffer((prev)=>({...prev, [e.target.name]: disc}));

      }
      const updateOffer = async (id)=>{
        try {
            const response = await axios.patch(`https://abifglobal-1.onrender.com/offer/edit/${id}`,
                offer, 
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

            if(response.status == 200){
                navigate('/offers');
            }else{
                setError('An error occurred');
            }
          } catch (error) {
            console.log(error);
            setError(`Sorry you don't have permission for this action`);
          }
    }

    return (
        <Layout>
            <div className="py-4 px-10 box-border h-[80vh] overflow-y-scroll">
                <h2 className="text-center text-red-800 text-2xl font-serif font-extrabold">UpdateOffer</h2>

                <span className="text-red-700">{error}</span>
                <div className="w-full mx-auto my-5 border border-red-800 p-5 box-border">
                    
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Offer Title</label> <br />
                            <input type="text" className="w-full border-2 border-red-800 my-4 p-2 text-black" name="title" value={offer.title} onChange={handleInputChange}/>
                        </div>
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Service</label><br />
                            <select className="border border-red-800" value={offer.service} name="service" onChange={handleInputChange}>
                                <option value="Dependant">Dependant</option>
                                <option value="No Dependant">No Dependant</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-start justify-between flex-wrap">
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Price (&#8358;)</label><br />
                            <input type="text" className="w-full border-2 border-red-800 my-4 p-2 text-black" name="price" value={offer.price} onChange={handleInputChange}/>
                        </div>
                        <div className="md:w-[48%] w-full">
                                    <label className="text-red-700 text-md font-semibold">Duration</label><br />
                                    <input type="text" className="w-full border-2 border-red-800 p-1 text-black" name="duration" value={offer.duration} onChange={handleInputChange}/>

                                    <label className="text-red-700 text-md font-semibold">Discount</label><br />
                                    <input type="text" className="w-full border-2 border-red-800 p-1 text-black" name="discount" value={offer.discount} onChange={handleDiscount}/>
                                </div>
                    </div>
                    <div className="flex items-center justify-between flex-wrap">
                        <textarea placeholder="Description" className="md:w-[48%] w-full border border-red-600 p-3 h-[20vh] my-1" name="description" value={offer.description} onChange={handleInputChange}></textarea>
                    </div>
                    
                    <div className="flex items-center justify-center mt-4">
                        <button onClick={()=>{ updateOffer(offerid)}} className="bg-red-800 text-white py-1 px-3 rounded-md transition-all duration-500 hover:bg-red-600">Edit</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Editoffer;