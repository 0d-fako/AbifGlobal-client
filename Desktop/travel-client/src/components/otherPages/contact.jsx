import { useState } from "react";
import Footer from "../footer";
import Header from "../header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'


function Contact() {
    const [inquiry, setInquiry] = useState({
        fullname: '',
        email: '',
        phone: '',
        destination: '',
        numofTravelers: 0,
        travelDate: '',
        travelTime: '',
        message: ''
    })
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const handleInputChange = (e)=>{
        const {value, name} = e.target ;
        setInquiry((prev)=>({
            ...prev, [name] : value
        }));
    }
    const submitInquiry = async (e)=>{
        setError("Submitting...");
        setShow(true);

        e.preventDefault();
        try {
            const inquiryresponse = await axios.post('https://abifglobal-1.onrender.com/inquiry/post',
                inquiry
            );
            console.log(inquiryresponse);

                setError('Successfully submitted!');

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="relative w-full md:w-full md:h-[100vh] h-[80vh] overflow-hidden bg-contact-hero bg-cover bg-center">
                <div className="absolute top-0 w-full md:h-[100vh] h-[80vh] bg-black opacity-60 z-20"></div>
                <div className="absolute top-0 w-full md:h-[100vh] h-[80vh] md:px-12 px-4 py-12 box-border z-50 overflow-hidden">
                    <Header />
                    <div className="md:mt-32 mt-44 w-full text-center">
                        <h3 className=" font-bold md:text-7xl text-5xl mb-4 text-yellow-400">Get in Touch</h3>
                        <p className=" text-xl font-light text-white">Ready to start your journey with ABIF Global? <br /> Our team is here to help make your travel dreams
                        a reality.</p>
                    </div>
                </div>
            </div>
            <section className="md:px-12 px-4 bg-yellow-400 py-16 box-border shadow-box-drop flex md:flex-row flex-col justify-between items-start">
                <div className="md:w-[48%] w-full">
                    <h3 className="text-red-600 text-2xl"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> Visit Us </h3>
                    <address>42, Mukaila jimoh street, Alaja Road, Ayobo Lagos Nigeria.</address>
                    <h3 className="mt-4 text-red-600 text-2xl"><FontAwesomeIcon icon="fa-solid fa-business-time" /> Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
                <div className="md:w-[48%] w-full">
                    <h3 className="text-red-600 text-2xl mt-4">Contact Information</h3>
                    <ul className="flex items-center md:justify-start justify-between md:gap-5 gap-0.5 flex-wrap mt-2.5">
                        <li><FontAwesomeIcon icon="fa-solid fa-phone-volume" /> <a href="telto:+2348180538270">+234 818 053 8270</a></li>
                        <li><FontAwesomeIcon icon="fa-solid fa-envelope-circle-check" /> <a href="mailto:@domain after hosting">abifglobaltravelsandtours@gmail.com</a></li>
                        <li><FontAwesomeIcon icon="fa-brands fa-facebook" /> <a href="https://www.facebook.com/profile.php?id=100091414773571&mibextid=wwXIfr&rdid=bXOlqkJBDhbUs10H&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EsYFCYvFW%2F%3Fmibextid%3DwwXIfr#">Abif Global</a></li>
                        <li><FontAwesomeIcon icon="fa-brands fa-instagram" /> <a href="https://instagram.com/Abif_global_travels">Abif_global_travels</a></li>
                    </ul>
                </div>
            </section>
            <div id="contact" className="md:mt-14 mt-1 md:px-12 px-4 py-11 box-border">
                <div className="text-center">
                    <h3 className="text-gray-600 font-semibold tracking-wide">GET STARTED</h3>
                    <h2 className="font-extrabold md:text-4xl text-3xl font-serif text-yellow-600">Customer Travel Form</h2>
                </div>
                <form onSubmit={(e)=>submitInquiry(e)} method="post" className="relative md:w-3/4 w-full mx-auto my-5 border-2 border-yellow-700 p-5 box-border">
                    <span className={`${show ? ' block fixed top-[20vh] md:left-[45%] left-[20%] bg-red-700' : 'hidden'} text-white md:text-lg text-md p-3 `}>{error}</span> <br />
                    <div className="md:flex md:flex-row flex-col items-center justify-evenly">
                        <input type="text" className="md:w-[48%] w-full border-2 border-yellow-700 my-4 p-2 text-black" name="fullname" placeholder="Fullname" value={inquiry.fullname} onChange={handleInputChange} required/>
                        <input type="email" name="email" className="md:w-[48%] w-full  border-2 border-yellow-700 my-4 p-2 text-black" placeholder="Email" value={inquiry.email} onChange={handleInputChange} required/>
                    </div>
                    <div className="md:flex md:flex-row flex-col items-center justify-evenly">
                        <input type="text" name="phone" className="md:w-[48%] w-full border-2 border-yellow-700 my-4 p-2 text-black" placeholder="Phone" value={inquiry.phone} onChange={handleInputChange} maxLength={11} required/>
                        <div className="md:w-[48%] w-full">
                            <input type="text" className="w-full border-2 border-yellow-700 my-4 p-2 text-black" name="destination" placeholder="Preferred Destination" value={inquiry.destination} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className="md:flex md:flex-row flex-col items-center justify-evenly w-full mt-3">
                        
                        <div className="md:w-[48%] w-full">
                            <label className="text-yellow-600 text-md font-semibold">Number of Travelers</label><br />
                            <input type="number" className="w-full border-2 border-yellow-700 my-4 p-2 text-black" name="numofTravelers" value={inquiry.numofTravelers} onChange={handleInputChange}/>
                        </div>
                        <div className="md:w-[48%] w-full">
                            <label className="text-yellow-600 text-md font-semibold">Travel Date</label>
                            <input type="date" className="w-full border-2 border-yellow-700 my-4 p-2 text-black" name="travelDate" value={inquiry.travelDate} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="md:flex md:flex-row flex-col items-center justify-evenly">
                        
                        <div className="w-full md:w-[48%]">
                            <label className="text-yellow-600 text-md font-semibold">Travel Time</label>
                            <input type="time" className="w-full border-2 border-yellow-700 my-4 p-2 text-black" name="travelTime" value={inquiry.travelTime} onChange={handleInputChange}/>
                        </div>
                        <div className="w-full md:w-[48%]">
                            <label className="text-yellow-600 text-md font-semibold">Message (optional)</label>
                            <textarea name="message" className="w-full border-2 border-yellow-700 my-4 p-2 text-black" rows="5" value={inquiry.message} onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                    
                    <div className="md:flex md:flex-row flex-col items-center justify-center">
                        <button type="submit" className="bg-yellow-700 text-white py-1 px-3 rounded-md transition-all duration-500 hover:bg-amber-600">Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;