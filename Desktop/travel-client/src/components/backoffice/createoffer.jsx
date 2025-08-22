import axios from "axios";
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
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError('Choose an image!');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB');
            return;
        }

        setImage(file);
        setError('');
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const saveImage = async () => {
        if (uploading) return; // Prevent double clicks
        
        setError('Loading...');
        setUploading(true);
        setUploadProgress(0);
        
        if (!image) {
            alert("Please select an image first!");
            setUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'abifglobal');
        // formData.append('folder', 'travel_offers');

        let retryCount = 0;
        const maxRetries = 3;
        const retryDelays = [2000, 5000, 10000]; // 2s, 5s, 10s

        while (retryCount <= maxRetries) {
            try {
                setUploadProgress(25 + (retryCount * 25));
                
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dqfwjnkcj/image/upload',
                    formData,
                    {
                        timeout: 30000, // 30 second timeout
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadProgress(progress);
                        }
                    }
                );

                const url = response.data.secure_url;
                setOffer((prev) => ({ ...prev, imgurl: url }));
                setError('Image uploaded successfully!');
                setUploadProgress(100);
                setUploading(false);
                return;

            } catch (error) {
                console.error(`Upload attempt ${retryCount + 1} failed:`, error);
                
                if (error.response?.status === 420) {
                    // Rate limit hit
                    if (retryCount < maxRetries) {
                        const delay = retryDelays[retryCount];
                        setError(`Rate limit reached. Retrying in ${delay/1000} seconds... (Attempt ${retryCount + 1}/${maxRetries + 1})`);
                        await sleep(delay);
                        retryCount++;
                        continue;
                    } else {
                        setError('Upload failed due to rate limiting. Please wait 10 minutes and try again.');
                    }
                } else if (error.code === 'ECONNABORTED') {
                    setError('Upload timeout. Please check your connection and try again.');
                } else if (error.response?.status >= 500) {
                    // Server error, retry
                    if (retryCount < maxRetries) {
                        const delay = retryDelays[retryCount];
                        setError(`Server error. Retrying in ${delay/1000} seconds...`);
                        await sleep(delay);
                        retryCount++;
                        continue;
                    } else {
                        setError('Server error. Please try again later.');
                    }
                } else {
                    setError(`Upload failed: ${error.response?.data?.error?.message || error.message}`);
                }
                break;
            }
        }
        
        setUploading(false);
        setUploadProgress(0);
    };

    const handleDiscount = (e) => {
        const disc = Number(e.target.value);
        if (disc === 0) {
            setOffer((prev) => ({ ...prev, newprice: 0 }));
        } else {
            let a = disc / 100;
            let r = a * offer.price;
            let newpric = offer.price - r;
            setOffer((prev) => ({ ...prev, newprice: newpric }));
        }
        setOffer((prev) => ({ ...prev, [e.target.name]: disc }));
    }

    const sendOffer = async () => {
        if (!offer.imgurl) {
            setError('Please upload an image first');
            return;
        }

        try {
            const response = await axios.post('https://abifglobal-1.onrender.com/offer/create',
                offer,
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

            if (response.status == 200) {
                navigate('/offers');
            } else {
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
                                <h3 className="text-sm mt-2 text-gray-500">
                                    {image ? image.name : 'Choose Photo'}
                                </h3>
                                {uploading && (
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div 
                                            className="bg-red-600 h-2 rounded-full transition-all duration-300" 
                                            style={{width: `${uploadProgress}%`}}
                                        ></div>
                                    </div>
                                )}
                                <input 
                                    className="block h-full w-full absolute top-0 bottom-0 z-10 left-0 right-0 opacity-0" 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange}
                                    disabled={uploading}
                                />
                            </div>
                            <div className="bg-red-600 text-white px-4 py-1">
                                <button 
                                    onClick={saveImage}
                                    disabled={uploading || !image}
                                    className={`${uploading || !image ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                                >
                                    {uploading ? 'Uploading...' : 'Save Image'}
                                </button>
                            </div>
                        </div>
                        <textarea 
                            placeholder="Description" 
                            className="md:w-[48%] w-full border border-red-600 p-3 md:h-[20vh] h-[10vh] my-1" 
                            name="description" 
                            value={offer.description} 
                            onChange={(e) => setOffer((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                        ></textarea>
                    </div>
                    
                    <div className="flex items-start justify-between flex-wrap mt-4">
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Offer Title</label><br />
                            <input 
                                type="text" 
                                className="w-full border-2 border-red-800 p-2 text-black" 
                                name="title" 
                                value={offer.title} 
                                onChange={(e) => setOffer((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                            />
                        </div>
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Service</label><br />
                            <select 
                                className="border border-red-800 w-full p-2" 
                                value={offer.service} 
                                name="service" 
                                onChange={(e) => setOffer((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                            >
                                <option value="">Select Service</option>
                                <option value="Dependant">Dependant</option>
                                <option value="No Dependant">No Dependant</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex items-start justify-between flex-wrap mt-2">
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Price (&#8358;)</label><br />
                            <input 
                                type="number" 
                                className="w-full border-2 border-red-800 p-2 text-black" 
                                name="price" 
                                value={offer.price} 
                                onChange={(e) => setOffer((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }))}
                            />
                        </div>
                        <div className="md:w-[48%] w-full">
                            <label className="text-red-700 text-md font-semibold">Duration</label><br />
                            <input 
                                type="text" 
                                className="w-full border-2 border-red-800 p-1 text-black mb-2" 
                                name="duration" 
                                value={offer.duration} 
                                onChange={(e) => setOffer((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                            />

                            <label className="text-red-700 text-md font-semibold">Discount (%)</label><br />
                            <input 
                                type="number" 
                                className="w-full border-2 border-red-800 p-1 text-black" 
                                name="discount" 
                                value={offer.discount} 
                                onChange={handleDiscount}
                                min="0"
                                max="100"
                            />
                            
                            {offer.newprice > 0 && (
                                <div className="mt-2 text-sm text-green-600">
                                    New Price: &#8358;{offer.newprice.toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-4">
                        <button 
                            onClick={sendOffer} 
                            disabled={uploading || !offer.imgurl}
                            className={`bg-red-800 text-white py-2 px-6 rounded-md transition-all duration-500 ${
                                uploading || !offer.imgurl 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-red-600'
                            }`}
                        >
                            Create Offer
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Createoffer;