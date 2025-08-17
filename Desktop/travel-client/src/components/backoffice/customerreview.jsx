import { useState , useEffect} from "react";
import Layout from "./layout";
import axios  from "axios";
import Cookies from "js-cookie"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const tableStyle = {
    padding: '2px 7px',
    border: '2px solid gray',
}

function Customerreview() {
    const [error, setError] = useState('');
    const token = Cookies.get('authToken');
    const [reviewContent, setReviewContent] = useState({
            customer_name: '',
            comment: '',
            rating: 0
    });
    const [loading, setLoading] = useState(false);
    const [customerStories, setCustomerStories] = useState([]);

        const postReview = async ()=>{
            const { customer_name, comment} = reviewContent;

            if (!customer_name.trim() || !comment.trim()) {
                setError('The customer name and comment cannot be empty.');
                return;
                }
        
                setLoading(true);
                setError('');
        
                try {
                    await axios.post(
                        'https://abifglobal-1.onrender.com/customerreview/post',
                        reviewContent,
                        {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                        }
                    );
                    setError('Customer story posted successfully!');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                } catch {
                    setError('Failed to update customer stories.');
                } finally {
                    setLoading(false);
                }
                
        }
    
        const fetchCustomerStories = async () => {
            try {
            const response = await axios.get('https://abifglobal-1.onrender.com/customerreview/get');
            
            const resp = response.data;
            if(resp){
                setCustomerStories(resp);
            }
            } catch {
            setError('Failed to load About Us content.');
            }
        };

        const deleteReview = async (reviewId) => {
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await axios.delete(`https://abifglobal-1.onrender.com/customerreview/delete/${reviewId}`, {
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

        useEffect(() => {
            fetchCustomerStories(); 
        }, []);    

    return (
        <Layout>
            <div className="md:w-[90%] py-4 md:px-10 px-5 box-border w-full mx-auto h-[80vh] overflow-scroll">
                <h3 className="text-xl text-red-800 my-3">Customer Stories</h3> <br />
                <span className="text-red-600">{error}</span>

                <div className="w-full">
                    <div className="my-4">
                        <label htmlFor="name">Customer name: </label>
                        <input type="text" name="customer_name" className="md:w-[250px] border-2 border-red-600 py-1 px-2 box-border rounded-md mr-5" value={reviewContent.customer_name} onChange={(e) => setReviewContent((prev)=>({...prev, [e.target.name]: e.target.value}))} />

                        <label htmlFor="rate">Rating: </label>
                        <input type="number" name="rating" className="border-2 border-red-600 py-1 px-2 box-border rounded-md" min={0} max={5} value={reviewContent.rating} onChange={(e) => setReviewContent((prev)=>({...prev, [e.target.name]: e.target.value}))} /> <br />

                    </div>
                    
                    <textarea className="border-2 border-red-600 p-4 box-border w-full"
                                        value={reviewContent.comment}
                                        name="comment"
                                        onChange={(e) => setReviewContent((prev) =>({...prev, [e.target.name] : e.target.value}))}
                                        placeholder="Write Review here..."
                                        rows="5"
                                        cols="70"
                                        disabled={loading}
                    /> <br />
                    <button onClick={postReview} disabled={loading} className="bg-red-600 text-white px-3 py-1 box-border">
                        {loading ? 'Saving...' : 'Post'}
                    </button>
                </div>
                <div className="w-full overflow-scroll">
                    {
                        customerStories.length > 0 && 
                        ( 
                            <table className="w-max mt-12 mx-2">
                                    <thead className="bg-red-600 text-white p-3">
                                        <tr>
                                            <th>S/N</th>
                                            <th style={{minWidth: '150px'}}>Name</th>
                                            <th>Rating</th>
                                            <th>Review</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            customerStories.map((cs, index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td style={tableStyle}>{index + 1}</td>
                                                        <td style={tableStyle}>{cs.customer_name}</td>
                                                        <td style={tableStyle}>{cs.rating}</td>
                                                        <td style={tableStyle}>{cs.comment}</td>
                                                        <td style={tableStyle}>                                        
                                                            <FontAwesomeIcon icon="fa-solid fa-trash" onClick={()=>{deleteReview(cs._id)}} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                            </table>
                        )
                    }
                </div>  
            </div>
        </Layout>
    );
}

export default Customerreview;