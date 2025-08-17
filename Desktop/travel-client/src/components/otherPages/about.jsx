import slide1 from "../images/slider1.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../footer";
import Header from "../header";


function Abouttext() {
        const [error, setError] = useState('');
        const [aboutData, setAboutData] = useState([]);

        const fetchAboutUs = async () => {
            try {
            const response = await axios.get('https://abifglobal-1.onrender.com/content/getaboutus');
            
            const resp = response.data;
            if(resp){
                setAboutData(resp);
            }
            } catch {
            setError('Failed to load About Us content.');
            }
        };
        
        useEffect(() => {
                fetchAboutUs(); 
              }, []);
    
    return(
        <div className="md:w-[50%] w-full">
            {
                aboutData.length > 0 ? 
                (aboutData.map((abd, index)=>{
                    return (
                        <div key={index}>
                            <p className="text-lg text-gray-800 my-3"><span className="text-xl text-red-500 font-bold">{abd.title}</span><br />
                                {abd.content}
                            </p> 
                        </div>                             
                    )
                   })        
                ) :
                (<p>{error}</p>)
            }
        </div>
    )
}

function About() {
    return (
        <div>
            <div className="relative w-full md:w-full md:h-[100vh] h-[80vh] overflow-hidden bg-about-hero bg-cover bg-center">
                <div className="absolute top-0 w-full md:h-[100vh] h-[80vh] bg-black opacity-60 z-20"></div>
                <div className="absolute top-0 w-full md:h-[100vh] h-[80vh] md:px-12 px-4 py-12 box-border z-50 overflow-hidden">
                        <Header />
                    <div className="md:mt-32 mt-44 w-full text-center">
                        <h3 className=" font-bold md:text-7xl text-5xl mb-4 text-yellow-400">About Us</h3>
                        <p className=" text-xl font-light text-white">We are the best at what we do</p>
                    </div>
                </div>
            </div>
            <section className="md:px-12 px-4 py-11 box-border">
                <div className="mt-8 md:flex md:items-center md:justify-between flex-wrap">
                    <Abouttext />
                    <div className="md:w-[42%] md:block hidden h-[80vh] w-full rounded-ss-[40%] rounded-ee-[40%] overflow-hidden">
                        <img src={slide1} alt="Image" className="w-full h-[80vh] object-fit" />
                    </div>
                </div>
            </section>
            <div className="flex flex-wrap items-center justify-evenly md:px-12 gap-2 md:gap-0 px-4 py-11 box-border bg-yellow-500">
                <div className="flex items-center md:justify-center justify-start gap-1 w-[45%] md:w-1/4">
                    <FontAwesomeIcon icon="fa-solid fa-user" className="text-4xl md:text-7xl  text-red-600" />
                    <p className="text-xl md:text-3xl font-bold text-red-600">2050 <br /> <span className="text-lg md:text-xl italic">Clients</span></p>
                </div>
                <div className="flex items-center md:justify-center justify-start gap-1 w-[45%] md:w-1/4">
                    <FontAwesomeIcon icon="fa-solid fa-book-open-reader" className="text-4xl md:text-7xl  text-red-600"/>
                    <p className="text-xl md:text-3xl font-bold text-red-600">625 <br /><span className="text-lg md:text-xl italic">Trips Booked</span></p>
                </div>
                <div className="flex items-center md:justify-center justify-start gap-1 w-[45%] md:w-1/4">
                    <FontAwesomeIcon icon="fa-solid fa-globe" className="text-4xl md:text-7xl  text-red-600" />
                    <p className="text-xl md:text-3xl font-bold text-red-600">1200 <br /><span className="text-lg md:text-xl italic">Countries</span></p>
                </div>
                <div className="flex items-center md:justify-center justify-start gap-1 w-[45%] md:w-1/4">
                    <FontAwesomeIcon icon="fa-solid fa-hotel" className="text-4xl md:text-7xl  text-red-600" />
                    <p className="text-xl md:text-3xl font-bold text-red-600">803 <br /><span className="text-lg md:text-xl italic">Reservations</span></p>
                </div>
            </div>
            <section className="md:px-12 px-4 py-11 box-border">
                <div className="my-5">
                    <div className="text-center">
                        <h3 className="text-gray-600 font-semibold tracking-wide">CORE COMMITMENTS</h3>
                        <h2 className="font-extrabold md:text-4xl text-3xl font-serif text-yellow-600">Our Values</h2>
                    </div>
                    <div className="my-10 flex md:flex-row flex-col gap-3 items-center justify-between flex-wrap">
                        <div className="rounded-ss-3xl rounded-ee-3xl bg-white border-2 overflow-hidden border-red-600 md:w-[30%] w-full h-[max] md:h-[40vh]">
                            <div className="bg-red-600 py-4 px-3 text-center">
                                <h4 className="text-white font-mono text-xl">Customer-Centric Approach</h4>
                            </div>
                            <div className="p-4 box-border">
                                <p>
                                We place our clients at the heart of everything we do, crafting personalized travel experiences
                                that create lasting memories. Your journey is our priority, and your satisfaction is our measure of
                                success.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-ss-3xl rounded-ee-3xl bg-white border-2 overflow-hidden border-red-600 md:w-[30%] w-full h-[max] md:h-[40vh]">
                            <div className="bg-red-600 py-4 px-3 text-center">
                                <h4 className="text-white font-mono text-xl">Intergrity & Transparency</h4>
                            </div>
                            <div className="p-4 box-border">
                                <p>
                                Trust is the foundation of our business. We operate with unwavering honesty and transparency,
                                ensuring that we deliver exactly what we promise, every single time.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-ss-3xl rounded-ee-3xl bg-white border-2 overflow-hidden border-red-600 md:w-[30%] w-full h-[max] md:h-[40vh]">
                            <div className="bg-red-600 py-4 px-3 text-center">
                                <h4 className="text-white font-mono text-xl">Passion for Exploration</h4>
                            </div>
                            <div className="p-4 box-border">
                                <p>
                                Our love for travel drives us forward. We&apos;re committed to inspiring others to explore the world
                                with wonder and curiosity, making every journey an adventure worth remembering.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-ss-3xl rounded-ee-3xl bg-white border-2 overflow-hidden border-red-600 md:w-[30%] w-full h-[max] md:h-[40vh]">
                            <div className="bg-red-600 py-4 px-3 text-center">
                                <h4 className="text-white font-mono text-xl">Innovation & Creativity</h4>
                            </div>
                            <div className="p-4 box-border">
                                <p>
                                We embrace innovation to design unique and 
                                unforgettable travel experiences that cater to the evolving needs of modern 
                                travelers.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-ss-3xl rounded-ee-3xl bg-white border-2 overflow-hidden border-red-600 md:w-[30%] w-full h-[max] md:h-[40vh]">
                            <div className="bg-red-600 py-4 px-3 text-center">
                                <h4 className="text-white font-mono text-xl">Cultural Respect & Inclusivity</h4>
                            </div>
                            <div className="p-4 box-border">
                                <p>
                                    We celebrate diversity and encourage 
                                    respect for all cultures, ensuring inclusive and enriching travel experiences for 
                                    everyone.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-ss-3xl rounded-ee-3xl bg-white border-2 overflow-hidden border-red-600 md:w-[30%] w-full h-[max] md:h-[40vh]">
                            <div className="bg-red-600 py-4 px-3 text-center">
                                <h4 className="text-white font-mono text-xl">Teamwork & Collaboration</h4>
                            </div>
                            <div className="p-4 box-border">
                                <p>
                                We foster a culture of collaboration among our 
                                team, partners, and clients to deliver seamless travel experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-24">
                    <div className="text-center">
                        <h3 className="text-gray-600 font-semibold tracking-wide">THE DRIVING FORCE</h3>
                        <h2 className="font-extrabold md:text-4xl text-3xl font-serif text-yellow-600">Leadership Team</h2>
                    </div>
                    <div className="my-10 flex md:flex-row flex-col items-center justify-evenly flex-wrap gap-4">
                        <div className="md:w-[45%] w-full shadow-box-drop flex md:flex-row flex-col items-center justify-start gap-3">
                            <div className=" md:border-r md:border-red-700 px-3 py-2 box-border md:w-[43%] w-full flex md:flex-col flex-row items-center md:items-start justify-center gap-2 md:flex-none">
                                <div className="w-[100px] h-[100px] overflow-hidden">
                                    <img src="https://res.cloudinary.com/dqqpnfocv/image/upload/v1741693007/Chairman_f7mwz5.jpg" alt="photo" className="w-[100px] object-cover h-[100px] rounded-full" /> 
                                </div>
                               
                               <div className="mt-3 ">
                                    <h4 className="text-yellow-700 text-xl">Hamed Agboro</h4>
                                    <p className="text-gray-600 italic text-lg">Chairman, ABIF Global</p>
                               </div>
                            </div>
                            <div className="md:px-2 py-2 px-3 box-border md:w-[57%] w-full">
                                <p className=" first-letter:text-red-600 first-letter:font-bold first-letter:text-xl">
                                A visionary leader with over two decades of experience in the travel, logistics, and hospitality
                                industry. With a BSc Degree from the University of Lagos, Nigeria, and a Level 5 (RQF)
                                qualification from the United Kingdom, Hamed brings unparalleled expertise to our operations.
                                His passion for travel and exploration has taken him across various countries, enriching our
                                company&apos;s global perspective.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-[45%] w-full shadow-box-drop flex md:flex-row flex-col items-center justify-start gap-3">
                            <div className="md:border-r border-red-700 px-3 py-2 box-border md:w-[43%] w-full flex md:flex-col flex-row md:items-start items-center justify-center gap-2 md:flex-none ">
                                <div className="w-[100px] h-[100px] overflow-hidden">
                                    <img src="https://res.cloudinary.com/dqqpnfocv/image/upload/v1741693147/CEO_aoygea.jpg" alt="photo" className="w-[100px] object-cover h-[100px] rounded-full" /> 
                                </div>
                               <div className="mt-3 ">
                                    <h4 className="text-yellow-700 text-xl">Gbemisola Agboro</h4>
                                    <p className="text-gray-600 italic text-lg">CEO, ABIF Global</p>
                               </div>
                            </div>
                            <div className="md:px-2 py-2 px-3 box-border md:w-[57%] w-full">
                                <p className=" first-letter:text-red-600 first-letter:font-bold first-letter:text-xl">
                                An accomplished business leader with over 10 years of experience in the travel and hospitality
                                industry. As a Certified Travel Executive (CTE) with a Higher National Diploma in Accountancy
                                and a Level 5 (RQF) qualification from the United Kingdom, Gbemisola brings both academic
                                excellence and practical expertise to her role. Her successful management of Testyfav
                                International School demonstrates her exceptional leadership capabilities.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-[45%] w-full shadow-box-drop flex md:flex-row flex-col items-center justify-start gap-3">
                            <div className=" md:border-r md:border-red-700 px-3 py-2 box-border md:w-[43%] w-full flex md:flex-col flex-row items-center md:items-start justify-center gap-2 md:flex-none">
                                <div className="w-[100px] h-[100px] overflow-hidden">
                                    <img src="https://res.cloudinary.com/dqqpnfocv/image/upload/v1741693227/HR_sib0rd.jpg" alt="photo" className="w-[100px] object-cover h-[100px] rounded-full" /> 
                                </div>
                               
                               <div className="mt-3 ">
                                    <h4 className="text-yellow-700 text-xl">Ms Dolapo Ajibade </h4>
                                    <p className="text-gray-600 italic text-lg"> Human Resources Director</p>
                               </div>
                            </div>
                            <div className="md:px-2 py-2 px-3 box-border md:w-[57%] w-full">
                                <p className=" first-letter:text-red-600 first-letter:font-bold first-letter:text-xl">
                                She bagged an MBA from university of Lagos , she doubles as an entrepreneur and a 
                                cooperate consultant, motivational speaker and a process manager. She has driven the human 
                                capital development of Abif Global travels and Tours to the present    Status and added value to 
                                the business in terms of staff recruitment, vendors arrangement, training and development, 
                                payroll management and brand image presentation. 
                                </p>
                            </div>
                        </div>
                        <div className="md:w-[45%] w-full shadow-box-drop flex md:flex-row flex-col items-center justify-start gap-3">
                            <div className=" md:border-r md:border-red-700 px-3 py-2 box-border md:w-[43%] w-full flex md:flex-col flex-row items-center md:items-start justify-center gap-2 md:flex-none">
                                <div className="w-[100px] h-[100px] overflow-hidden">
                                    <img src="https://res.cloudinary.com/dqqpnfocv/image/upload/v1741693287/Accountant_sbxjah.jpg" alt="photo" className="w-[100px] object-cover h-[100px] rounded-full" /> 
                                </div>
                               
                               <div className="mt-3 ">
                                    <h4 className="text-yellow-700 text-xl">Mr Kehinde Akangbe</h4>
                                    <p className="text-gray-600 italic text-lg">Accountant , ABIF Global</p>
                               </div>
                            </div>
                            <div className="md:px-2 py-2 px-3 box-border md:w-[57%] w-full">
                                <p className=" first-letter:text-red-600 first-letter:font-bold first-letter:text-xl">
                                Possess broad and comprehensive knowledge of financial procedures and a keen eye for detail 
                                combined with a calm, professional demeanor to deliver detailed and accurate accounting 
                                operations for Abif Global travels and tours Limited He is a conceptual audit and investigation 
                                accountant , reconciliation, financial planning, preparation of statutory financial statements and 
                                management accounts, financial analysis and management, funds transfer, and corporate 
                                accounting experts with numerous years of experience and practice within the accounting 
                                scope. 
                                </p>
                            </div>
                        </div>
                        <div className="md:w-[45%] w-full shadow-box-drop flex md:flex-row flex-col items-center justify-start gap-3">
                            <div className=" md:border-r md:border-red-700 px-3 py-2 box-border md:w-[43%] w-full flex md:flex-col flex-row items-center md:items-start justify-center gap-2 md:flex-none">
                                <div className="w-[100px] h-[100px] overflow-hidden">
                                    <img src="https://res.cloudinary.com/dqqpnfocv/image/upload/v1741693358/Marketing_Director_shorht.jpg" alt="photo" className="w-[100px] object-cover h-[100px] rounded-full" /> 
                                </div>
                               
                               <div className="mt-3 ">
                                    <h4 className="text-yellow-700 text-xl">Mrs Alaba Imoleayo </h4>
                                    <p className="text-gray-600 italic text-lg">Marketing Director </p>
                               </div>
                            </div>
                            <div className="md:px-2 py-2 px-3 box-border md:w-[57%] w-full">
                                <p className=" first-letter:text-red-600 first-letter:font-bold first-letter:text-xl">
                                Results-driven and strategic Marketing Director with over 15 years of experience leading 
                                high-impact marketing initiatives for Abif Global Travels and tours, Expertise in brand 
                                management, digital marketing, market research, and revenue growth strategies. Proven track 
                                record of driving customer engagement, optimizing marketing ROI, and leading cross-functional 
                                teams. Passionate about leveraging data-driven insights to craft compelling campaigns that 
                                resonate with target audiences. She has a degree in mass communication.   
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
            <div className="mt-15 bg-yellow-500 md:px-12 px-4 py-11 box-border">
                    <h2 className="font-extrabold md:text-4xl text-3xl font-serif text-red-600">Our Team</h2>
                    <p className="italic">Behind our success stands a dedicated team of professionals</p>
                    <div className="flex items-start justify-evenly py-8 flex-row gap-4 md:flex-nowrap flex-wrap">
                        <div className="flex flex-col justify-center items-center md:w-1/5 w-5/12">
                            <FontAwesomeIcon icon="fa-solid fa-users" className="text-white hover:text-red-600 transition duration-500 text-4xl py-4 px-3 bg-red-600 hover:bg-white rounded-full"/>
                            <p className="text-red-600 font-semibold md:w-3/5 w-full text-center leading-tight">Human Resource Department</p>
                        </div>
                        <div className="flex flex-col justify-center items-center md:w-1/5 w-5/12">
                            <FontAwesomeIcon icon="fa-solid fa-chart-column" className="text-white hover:text-red-600 transition duration-500 text-4xl py-4 px-3 bg-red-600 hover:bg-white rounded-full"/>
                            <p className="text-red-600 font-semibold md:w-3/5 w-full text-center leading-tight">Marketing Team <br /><span className="italic">(4 specialists)</span></p>
                        </div>
                        <div className="flex flex-col justify-center items-center md:w-1/5 w-5/12">
                            <FontAwesomeIcon icon="fa-solid fa-money-check-dollar" className="text-white hover:text-red-600 transition duration-500 text-4xl py-4 px-3 bg-red-600 hover:bg-white rounded-full"/>
                            <p className="text-red-600 font-semibold md:w-3/5 w-full text-center leading-tight">Finance Department <br /> <span className="italic">(2 experts)</span></p>
                        </div>
                        <div className="flex flex-col justify-center items-center md:w-1/5 w-5/12">
                            <FontAwesomeIcon icon="fa-solid fa-head-side-virus" className="text-white hover:text-red-600 transition duration-500 text-4xl py-4 px-3 bg-red-600 hover:bg-white rounded-full"/>
                            <p className="text-red-600 font-semibold md:w-3/5 w-full text-center leading-tight">Creative Team <br /> <span className="italic">(2 professionals)</span></p>
                        </div>
                        <div className="flex flex-col justify-center items-center md:w-1/5 w-5/12">
                            <FontAwesomeIcon icon="fa-solid fa-network-wired" className="text-white hover:text-red-600 transition duration-500 text-4xl py-4 px-3 bg-red-600 hover:bg-white rounded-full"/>
                            <p className="text-red-600 font-semibold md:w-3/5 w-full text-center leading-tight">Network of Specialized Contract Vendor</p>
                        </div>
                    </div>
                </div>
                    <Footer />
            
        </div>
    );
}

export default About;