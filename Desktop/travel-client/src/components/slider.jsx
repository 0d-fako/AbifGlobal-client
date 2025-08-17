import { useEffect, useState } from 'react'
import axios from 'axios'


function Slider() {
    const [currSlide, setCurrSlide] = useState(0);
    const [imageslide, setImageslide] = useState([]);

      const getImages = async ()=>{
        try{
            const imageresponse = await axios.get('https://abifglobal-1.onrender.com/content/getimage');
            const res = imageresponse.data;
            if(res){
                setImageslide(res);
            }
        }catch(error){
            console.log(error);
        }
      }

      useEffect(()=>{
        getImages();
      }, [])

      useEffect(()=>{
            const interval = setInterval(() => {
              setCurrSlide((prev) => (prev + 1) % imageslide.length);
            }, 5000);

            return () => clearInterval(interval);
      }, [imageslide.length])
    return (
        <div className='relative flex w-full h-[100vh] md:h-[120vh] overflow-hidden'>
            {
                imageslide.map((slide, index)=>{
                    return(
                        <div key={index} className={`absolute top-0 w-full h-[100vh] md:h-[120vh] transition-all overflow-hidden z-30 ${index === currSlide ? "opacity-100 scale-100" : "scale-90 opacity-0"}`}>
                            <img className='w-full h-[100vh] md:h-[120vh] object-cover brightness-[40%]' src={slide.imageurl}/>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Slider;