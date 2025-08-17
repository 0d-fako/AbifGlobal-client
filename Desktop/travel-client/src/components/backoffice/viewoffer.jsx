import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import Layout from "./layout";


const tableStyle = {
    padding: '2px 7px',
    border: '2px solid black',
    textAlign: 'center',
    color: 'red'
}


function Viewoffer() {
    const [offers, setOffers] = useState([]);
    const token = Cookies.get("authToken");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const getOffers = async ()=> {
        try{
           const response = await axios.get('https://abifglobal-1.onrender.com/offer/alloffers');

            // console.log(response); 
            const offer = response.data;
            offer && setOffers(offer);

        }catch(err){
            console.log(err);
        }
    }
    const deleteOffer = async (offerId) => {
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const response = await axios.delete(`https://abifglobal-1.onrender.com/offer/delete/${offerId}`, {
                headers: {
                    'Authorization': `Token ${token}` 
                }
            });
    
            if (response.status === 200) {
                setError('Offer has been deleted');
            }else{
                setError('An error occurred');
            }
        } catch (error) {
            console.log(error);
            setError(`Sorry you don't have permission for this action`);
        }
    };
    const editOffer = async (offerId) =>{
        Cookies.set('offerid', offerId);

        navigate('/editoffer');
    }
    
    useEffect(()=>{
        getOffers();
    }, [])

    return (
        <Layout>
                <div className="py-8 md:px-20 px-5 box-border">
                    <div className="flex justify-between items-center flex-wrap">
                        <h2 className=" text-red-900 text-3xl font-serif font-extrabold">Offers</h2>
                        <Link to={'/createoffer'} className="bg-red-600 text-white py-1 px-3 rounded-md transition-all duration-500 hover:bg-amber-600"><FontAwesomeIcon icon="fa-solid fa-plus" /> Add Offer</Link>
                    </div>
                    <span className="text-red-700">{error}</span>
                    <div className="w-full overflow-scroll">
                        <table className="w-max mt-12 border-2 border-solid">
                            <thead className="bg-red-600 text-white p-3">
                                <tr>
                                    <th>S/N</th>
                                    <th>Title</th>
                                    <th>Duration</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    offers.map((offer, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td style={tableStyle}>{index + 1}</td>
                                                <td style={tableStyle}>{offer.title}</td>
                                                <td style={tableStyle}>{offer.duration}</td>
                                                <td style={tableStyle}>{offer.price}</td>
                                                <td style={tableStyle}>{offer.discount}%</td>
                                                <td style={tableStyle}><button onClick={()=>{editOffer(offer._id);}} className="bg-yellow-600 text-white py-1 px-3 rounded-md transition-all duration-500 hover:bg-amber-600">Edit</button></td>
                                                <td style={tableStyle}><button onClick={()=>{deleteOffer(offer._id);}} className="bg-red-600 text-white py-1 px-3 rounded-md transition-all duration-500 hover:bg-amber-600">Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    
                </div>
        </Layout>        
    );
}

export default Viewoffer;