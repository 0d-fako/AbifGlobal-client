import { useEffect, useState } from "react";
import Layout from "./layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios  from "axios";
import Cookies from "js-cookie"

const sections = [
    "Hero", "About" 
]

function Heroimage() {
    const [image, setImage] = useState([]);
    const [error, setError] = useState('');
    const token = Cookies.get('authToken');
    const [bool, setBool] = useState(false);
    const [imageload, setImageload] = useState({
        section: '',
        imageurl: ''
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        if (!file){
            setError('Choose an image!');
        }; 
      
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage([reader.result]);
        };
        reader.readAsDataURL(file);
      };

    const saveImage = async () => {
        if (image.length === 0) {
          setError("Please select an image first!");
          return;
        }
        
        setError('Loading...');

        const formData = new FormData();
        formData.append('file', image[0]);
        formData.append('upload_preset', 'abifglobal');
      
        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dqqpnfocv/image/upload ',
            formData
          );
      
          const url = response.data.secure_url;
      
          setImageload((prev) => ({ ...prev, imageurl: url}));
          setBool(true);
          setTimeout(() => {
            setError('Image uploaded successfully!');
          }, 1000);
      
        } catch {
          setTimeout(() => {
            setError('Failed to upload the image. Please try again.');
          }, 1000);
        }
      };


    useEffect(()=>{
        if(bool){
            sendImage();
        }
    }, [bool]);

    const sendImage = async () =>{
        try {
            const sendimageresponse = await axios.post('https://abifglobal-1.onrender.com/content/createimage',
                imageload, 
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                console.log(sendimageresponse);
                
                setTimeout(() => {
                    window.location.reload();
                  }, 1000);

        } catch {
            setError('Couldn"t save the images try again!');
        }
    }

    return (
        <Layout>
            <div className="md:w-[90%] py-4 md:px-10 px-5 box-border w-full mx-auto h-[80vh] overflow-y-scroll">
                <h3 className="text-xl text-red-800 my-3">Image Management</h3> <br />
                <span className="text-red-600">{error}</span>

                <div className="w-full p-3 md:w-[50%]">
                    <label htmlFor="section" className="text-red-600 font-semibold mr-2">Choose section: </label>
                    <select id="section" className="bg-red-600 text-white px-3 py-0 box-border" name="section" value={imageload.section} onChange={(e)=>setImageload((prev)=>({...prev, [e.target.name]: e.target.value}))}>
                        <option value="">Section</option>
                            {
                                sections.map((sect, index)=>{
                                    return(
                                        <option value={sect} key={index}>{sect}</option>
                                    )
                                })
                            }
                    </select>
                </div>
                <div className="w-full p-3 md:w-[50%] box-border border-2 border-dashed border-red-600 flex flex-col items-center justify-center">
                    
                    <div className="text-center p-6 relative box-border">
                        <FontAwesomeIcon icon="fa-solid fa-upload" className="text-red-600" />
                            <h3 className="text-sm mt-2 text-gray-500">{image.length > 0 ? '' : 'Upload Photo'}</h3>
                            <input className="block h-full w-full absolute top-0 bottom-0 left-0 right-0 opacity-0" type="file" onChange={ handleFileChange}/>
                    </div>
                    <div className="bg-red-600 text-white px-4 py-1">
                        <button onClick={saveImage}>Save</button>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap">
                    {image &&
                        image.map((url, index)=>{
                            return (            
                                <img className="md:w-1/2 w-full" key={index} src={url} alt={`update${index}`} />
                            )
                        })
                    }
                </div>
            </div>
        </Layout>    
    );
}

export default Heroimage;