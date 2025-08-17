import { useState , useEffect} from "react";
import Layout from "./layout";
import axios  from "axios";
import Cookies from "js-cookie"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Editaboutus() {
    const [error, setError] = useState('');
    const token = Cookies.get('authToken');
    const [aboutContent, setAboutContent] = useState({
        title: '',
        content: ''
    });
    const [aboutData, setAboutData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchAboutUs = async () => {
        try {
        const response = await axios.get('https://abifglobal-1.onrender.com/content/getaboutus');
        
        const resp = response.data;
        if(resp){
            setAboutData(resp);
        }
        console.log(response);
        } catch (error) {
        console.error('Error fetching About Us content:', error);
        setError('Failed to load About Us content.');
        }
    };

    const updateAboutUs = async () => {
        const { title, content } = aboutContent;

        if (!title.trim() || !content.trim()) {
        setError('Title and Content cannot be empty.');
        return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post(
                'https://abifglobal-1.onrender.com/content/createaboutus',
                aboutContent,
                {
                headers: {
                    Authorization: `Token ${token}`,
                },
                }
            );
            setError('About Us content updated successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
        console.error('Error updating About Us content:', error);
        setError('Failed to update About Us content.');
        } finally {
        setLoading(false);
        }
      };
    
      const deleteContent = async (contentId) => {
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const response = await axios.delete(`https://abifglobal-1.onrender.com/content/deleteaboutus/${contentId}`, {
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
        fetchAboutUs(); 
      }, []);
    return (
        <Layout>
            <div className="md:w-[90%] py-4 md:px-10 px-5 box-border w-full mx-auto h-[80vh] overflow-y-scroll">
                <h3 className="text-xl text-red-800 my-3">About Us  </h3> <br />
                <span className="text-red-600">{error}</span>

                <div className="flex md:flex-row flex-col items-start justify-between">
                    <div className="md:w-[47%] w-full">
                        <label htmlFor="section" className="text-red-600 font-semibold mr-2">Choose section: </label>
                        <select id="section" className="bg-red-600 text-white px-3 py-1 box-border" name="title" value={aboutContent.title} onChange={(e)=>setAboutContent((prev)=>({...prev, [e.target.name]: e.target.value}))}>
                            <option value="">Section</option>
                            <option value="Our Story">Our Story</option>
                            <option value="Our Evolution">Our Evolution</option>
                        </select> <br /> <br />
                        <textarea className="border-2 border-red-600 p-4 box-border w-full"
                            value={aboutContent.content}
                            name="content"
                            onChange={(e) => setAboutContent((prev) =>({...prev, [e.target.name] : e.target.value}))}
                            placeholder="Write About Us content here..."
                            rows="10"
                            cols="50"
                            disabled={loading}
                        /> <br />
                        <button onClick={updateAboutUs} disabled={loading} className="bg-red-600 text-white px-3 py-1 box-border">
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                    <div className="md:w-[50%] w-full">
                        {
                            aboutData.length > 0 ? 
                            (aboutData.map((abd, index)=>{
                                return (
                                    <div key={index}>
                                        <FontAwesomeIcon icon="fa-solid fa-trash" onClick={()=>{deleteContent(abd._id)}} />
                                        <p className="text-lg text-gray-800 my-3"><span className="text-xl text-red-500 font-bold">{abd.title}</span><br />
                                        {abd.content}
                                        </p> 

                                    </div>
                                    
                                )
                            })
                               
                            ) :
                            (<p>Loading content...</p>)
                        }
                        
                    </div>
                </div>
                
            </div>
        </Layout>
    );
}

export default Editaboutus;