import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link} from 'react-router-dom';
import Layout from './layout';
import axios from 'axios';
import { useEffect, useState } from 'react';




function Dashboard() {
    const [count, setCount] = useState(0);
    const [inquiries, setInquiries] = useState(0);
    useEffect(() => {
        const fetchOfferCount = async () => {
            try {
                const response = await axios.get('https://abifglobal-1.onrender.com/offer/offercount');
                const data = response.data;
                if (data) {
                    setCount(data.count);
                }

            } catch (error) {
                console.error(error);
            }
        };

        const fetchInquiries = async () => {
            try {
                const response = await axios.get('https://abifglobal-1.onrender.com/inquiry/inquirycount');
                const data = response.data;
                if (data) {
                    setInquiries(data.count);
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchInquiries();
        fetchOfferCount();
    })

    return (
        <Layout>
            <div className="flex flex-wrap items-center justify-center gap-5 mt-9 px-3">
                    <div className="rounded-xs md:md:w-[30%] w-full p-5 box-border bg-amber-400 md:h-[40vh] h-max md:flex items-center justify-between gap-3">
                        <FontAwesomeIcon icon="fa-solid fa-users-gear" className='md:text-7xl md:block hidden' />
                        <div>
                            <h3 className='text-3xl text-red-800 mb-3'>Offer Management</h3>
                            <p className='italic text-sm mb-1'>{count} offer(s) available</p>
                            <Link to={'/offers'} className='bg-red-800 py-1 px-3 text-md text-white my-2'>View Offers</Link>
                        </div>
                    </div>
                    <div className="rounded-xs md:w-[30%] w-full p-5 box-border bg-green-500 md:h-[40vh] h-max md:flex items-center justify-between gap-3">
                        <FontAwesomeIcon icon="fa-solid fa-arrows-to-circle"  className='md:text-7xl md:block hidden' />
                        <div>
                            <h3 className='text-3xl text-red-800 mb-3'>Content Management</h3>
                            <Link to={'/addaboutus'} className='bg-red-800 py-1 px-3 text-md text-white my-2'>View</Link>
                        </div>
                    </div>
                    <div className="rounded-xs md:w-[30%] w-full p-5 box-border bg-blue-700 md:h-[40vh] h-max md:flex items-center justify-between gap-3">
                        <FontAwesomeIcon icon="fa-solid fa-phone-volume" className='md:text-7xl md:block hidden' />
                        <div>
                            <h3 className='text-3xl text-white mb-3'>Inquiry Management</h3>
                            <p className='italic text-sm mb-1 text-blue-200'>{inquiries} inquiries sent</p>
                            <Link to={'/inquiries'} className='bg-red-800 py-1 px-3 text-md text-white my-2'>Manage Inquiry</Link>
                        </div>
                    </div>
            </div>
        </Layout>
    );
}

export default Dashboard;