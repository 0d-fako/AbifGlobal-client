import axios  from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import Layout from "./layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function Createoffer() {
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
    const [image, setImage] = useState(null); 

    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        if (!file){
            setError('Choose an image!');
            return; 
        }; 
      
        
        setImage(file);
        setError(''); 
    };
      
    const saveImage = async () => {
        setError('Loading...');
        if (!image) {
            alert("Please select an image first!");
            return;
        }
        
        const formData = new FormData();
        formData.append('file', image); 
        formData.append('upload_preset', 'abifglobal');
      
        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dqqpnfocv/image/upload',
                formData
            );
      
            const url = response.data.secure_url;
      
            setOffer((prev) => ({ ...prev, imgurl: url }));
            setError('Image uploaded successfully!'); 
      
        } catch (error) { 
            console.error('Upload error:', error);
            setError('Failed to upload the image. Please try again.'); 
        }
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


    const sendOffer = async ()=>{
        try {
            const response = await axios.post('https://abifglobal-1.onrender.com/offer/create',
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
            <div className="py-4 md:px-10 px-5 box-border h-[80vh] overflow-y-scroll">
                <h2 className="text-center text-red-800 text-2xl font-serif font-extrabold">Create Offer</h2>

                <span className="text-red-700">{error}</span>
                <div className="w-full mx-auto my-5 border border-red-800 p-5 box-border">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="md:w-[48%] w-full p-3 box-border border-2 border-dashed border-red-600 flex flex-col items-center justify-center">
                            <div className="text-center p-6 relative box-border">
                                <FontAwesomeIcon icon="fa-solid fa-upload" className="text-red-600" />
                                <h3 className="text-sm mt-2 text-gray-500">{image ? 'Image Selected' : 'Photo'}</h3> {/* CHANGED: from image.length > 0 to image */}
                                <input className="block h-full w-full absolute top-0 bottom-0 z-10 left-0 right-0 opacity-0" type="file" accept="image/*" onChange={handleFileChange} /> {/* ADDED: accept="image/*" */}
                            </div>
                            <div className="bg-red-600 text-white px-4 py-1">
                                <button onClick={saveImage}>Save Image</button>
                            </div>
                        </div>
                        <textarea placeholder="Description" className="md:w-[48%] w-full border border-red-600 p-3 md:h-[20vh] h-[10vh] my-1" name="description" value={offer.description} onChange={(e)=>setOffer((prev) => ({...prev, [e.target.name]:e.target.value}))}></textarea>
                        
                    </div>
                    <div className="flex items-start justify-between flex-wrap mt-4">
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Offer Title</label><br />
                            <input type="text" className="w-full border-2 border-red-800 p-2 text-black" name="title" value={offer.title} onChange={(e)=>setOffer((prev) => ({...prev, [e.target.name]:e.target.value}))}/>
                        </div>
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Service</label><br />
                            <select className="border border-red-800" value={offer.service} name="service" onChange={(e)=>setOffer((prev) => ({...prev, [e.target.name]:e.target.value}))}>
                                <option value="Dependant">Dependant</option>
                                <option value="No Dependant">No Dependant</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-start justify-between flex-wrap mt-2">
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Price (&#8358;)</label><br />
                            <input type="text" className="w-full border-2 border-red-800 p-2 text-black" name="price" value={offer.price} onChange={(e)=>setOffer((prev) => ({...prev, [e.target.name]:e.target.value}))}/>
                        </div>
                        <div className="md:w-[48%] w-full">
                                    <label className="text-red-700 text-md font-semibold">Duration</label><br />
                                    <input type="text" className="w-full border-2 border-red-800 p-1 text-black" name="duration" value={offer.duration} onChange={(e)=>setOffer((prev) => ({...prev, [e.target.name]:e.target.value}))}/>

                                    <label className="text-red-700 text-md font-semibold">Discount</label><br />
                                    <input type="text" className="w-full border-2 border-red-800 p-1 text-black" name="discount" value={offer.discount} onChange={handleDiscount}/>
                                </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-4">
                        <button onClick={()=>{sendOffer()}} className="bg-red-800 text-white py-1 px-3 rounded-md transition-all duration-500 hover:bg-red-600">Create</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Createoffer;