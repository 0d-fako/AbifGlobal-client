import { useState , useEffect} from "react";
import Layout from "./layout";
import axios  from "axios";
import Cookies from "js-cookie"


const tableStyle = {
    padding: '5px 7px',
    border: '2px solid gray',
}

function Inquiry() {
        const [error, setError] = useState('');
        const [customerInquiries, setCustomerInquiries] = useState([]);
        const token = Cookies.get('authToken');
        
        const fetchInquiries = async () => {
            try {
            const response = await axios.get('https://abifglobal-1.onrender.com/inquiry/get');
            
            const resp = response.data;
            console.log(resp);
            if(resp){
                setCustomerInquiries(resp);
            }
            } catch {
            setError('Failed to load About Us content.');
            }
        };

        const deleteInquiry = async (inquiryId) => {
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await axios.delete(`https://abifglobal-1.onrender.com/inquiry/delete/${inquiryId}`, {
                    headers: {
                        'Authorization': `Token ${token}` 
                    }
                });
        
                if (response.status === 200) {
                    setError('Successfully deleted!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }else{
                    setError('An error occurred, could not delete.');
                }
    
            } catch (error) {
                console.log(error);
                setError(`Sorry you don't have permission for this action`);
            }
        };

        const changeStatus = async (inquiryId)=>{
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await axios.put(`https://abifglobal-1.onrender.com/inquiry/changestatus/${inquiryId}`, {
                    headers: {
                        'Authorization': `Token ${token}` 
                    }
                });
        
                if (response.status === 200) {
                    setError('Marked as complete!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }else{
                    setError('An error occurred, could not change inquiry status.');
                }
    
            } catch (error) {
                console.log(error);
                setError(`Sorry you don't have permission for this action`);
            }
        }

        useEffect(() => {
            fetchInquiries(); 
        }, []); 
    return (
        <Layout>
             <div className="py-8 md:px-20 px-5 box-border ">
                    <div className="flex justify-between items-center flex-wrap">
                        <h2 className=" text-red-900 text-3xl font-serif font-extrabold">Customer Inquiries</h2>
                    </div>
                    <span className="text-red-700">{error}</span>
                    <div className="w-full overflow-scroll p-5 box-border">
                        <table className="w-max mt-12">
                            <thead className="bg-red-600 text-white p-3">
                                <tr>
                                    <th>S/N</th>
                                    <th className=" min-w-[200px]">Fullname</th>
                                    <th>Phone</th>
                                    <th className=" min-w-[100px]">Email</th>
                                    <th>Destination</th>
                                    <th className=" min-w-[100px]">Travel Date</th>
                                    <th className=" min-w-[100px]">Travel Time</th>
                                    <th>No. of travelers</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customerInquiries.map((inq, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td style={tableStyle}>{index + 1}</td>
                                                <td style={tableStyle}>{inq.fullname}</td>
                                                <td style={tableStyle}>{inq.phone}</td>
                                                <td style={tableStyle}>{inq.email}</td>
                                                <td style={tableStyle}>{inq.destination}</td>
                                                <td style={tableStyle}>{inq.travelDate}</td>
                                                <td style={tableStyle}>{inq.travelTime}</td>
                                                <td style={tableStyle}>{inq.numofTravelers}</td>
                                                <td style={tableStyle} className="text-left min-w-[250px]">{inq.message}</td>
                                                <td style={tableStyle} className="text-red-600">{inq.status}</td>
                                                <td style={tableStyle}><button onClick={()=>{changeStatus(inq._id);}} className="w-max bg-red-600 text-white py-1 px-3 rounded-md transition-all duration-500 hover:bg-amber-600">Mark as Complete</button></td>
                                                <td style={tableStyle}><button onClick={()=>{deleteInquiry(inq._id);}} className="bg-red-600 text-white py-1 px-3 rounded-md transition-all duration-500 hover:bg-amber-600">Delete</button></td>
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

export default Inquiry;