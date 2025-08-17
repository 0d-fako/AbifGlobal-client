import { lazy, Suspense, useEffect } from "react";
import waves from "./images/waves.png";
import slide1 from "./images/slider2.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Slider from "./slider";
import Review from "./review";
import Header from "./header";
import Footer from "./footer";

const Offersect = lazy(() => import("./offersect"));

function Home() {
    useEffect(()=>{
        import('./slider');
        import('./review');
    })
  return (
    <>
      <div className="relative w-full md:w-full md:h-[120vh] h-[100vh] bg-black">
          <Slider />
        <div className="absolute top-0 w-full md:h-[120vh] h-[100vh] md:px-12 px-4 py-12 box-border z-40 overflow-hidden flex flex-col items-center">
            <Header />
          <div className="md:mt-36 mt-52 w-full text-center md:w-3/5">
            <h3 className="font-bold md:text-5xl text-3xl mb-4 text-yellow-400">
              Discover Your Next Adventure with ABIF Global
            </h3>
            <p className="text-xl font-light text-white">
              Where Dreams Take Flight and Memories Last Forever
            </p>
          </div>
        </div>
        <div className="absolute w-full md:h-36 h-28 -bottom-5 md:bottom-0 z-40">
          <img className="w-full h-full object-cover object-top" src={waves} alt="" />
        </div>
      </div>

      <section className="md:px-12 px-4 py-5 box-border">
        <div className="mt-8 md:flex md:items-center md:justify-between flex-wrap">
          <div className="md:w-[50%] w-full">
            <p className="text-xl text-gray-800 my-3 first-letter:text-2xl first-letter:text-red-600 first-letter:font-bold">
              Experience world-class travel planning, innovative media solutions, and comprehensive logistics services with Nigeria&apos;s premier travel and tours company. Let us transform your travel dreams into reality.
            </p>
            <ul className="mb-8">
              <h3 className="text-2xl text-red-600 font-bold">Featured Services:</h3>
              <li className="text-md my-2">
                <span className="font-bold text-red-700 text-lg">Bespoke Travel Experience: </span>Create unforgettable journeys tailored to your preferences
              </li>
              <li className="text-md my-2">
                <span className="font-bold text-red-700 text-lg">Media Production: </span>Cutting-edge media solutions for your brand.
              </li>
              <li className="text-md my-2">
                <span className="font-bold text-red-700 text-lg">Logistics Services: </span>Seamless coordination for all your travel needs.
              </li>
            </ul>
            <Link to={"/about"} className="bg-red-600 text-white py-2 px-3">See More</Link>
          </div>
          <div className="md:w-[45%] w-full mt-7">
            <img src={slide1} alt="Image" className="w-full md:h-[70vh] h-[50vh] object-cover" />
          </div>
        </div>
      </section>

      <div className="mt-8 bg-red-600 md:px-12 px-4 py-9 box-border">
        <h2 className="text-3xl text-white">Why Choose ABIF Global?</h2>
        <div className="flex items-center justify-evenly py-8 flex-row gap-4 md:flex-nowrap flex-wrap">
          {[
            { icon: "fa-car-side", text: "Personalized service delivery" },
            { icon: "fa-cart-flatbed-suitcase", text: "Innovative travel solutions" },
            { icon: "fa-map-location", text: "Expert local knowledge" },
            { icon: "fa-business-time", text: "24/7 support for travelers" },
            { icon: "fa-camera-retro", text: "Comprehensive media integration" }
          ].map((item, index) => (
            <div key={index} className="flex flex-col justify-center items-center md:w-1/5 w-5/12">
              <FontAwesomeIcon icon={`fa-solid ${item.icon}`} className="text-red-600 hover:text-yellow-400 transition duration-500 text-4xl py-4 px-3 bg-yellow-400 hover:bg-white rounded-full" />
              <p className="text-yellow-400 font-semibold md:w-3/5 w-full text-center leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="md:px-12 px-4 py-5 box-border">
        <Suspense fallback={<div>Loading Offers...</div>}>
          <Offersect />
        </Suspense>
      </section>

    <Review />

      <div className="relative h-[35vh] bg-[#e846469b] box-border text-center">
        <div className="absolute top-0 w-full h-full px-12 py-10 flex flex-col items-center justify-center">
          <h3 className="text-red-600 font-bold md:text-4xl text-3xl font-serif">
            Subscribe to Our Newsletter
          </h3>
          <form className="md:flex md:flex-row flex-col items-center justify-center mt-5">
            <input type="email" className="py-3 px-7 text-gray-700 bg-white" placeholder="Enter your email..." />
            <button className="py-3 px-7 w-max bg-red-600 text-white">Subscribe</button>
          </form>
          <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" className="hidden md:block absolute top-20 text-8xl left-[20%] text-[#3f240442]" />
        </div>
      </div>

        <Footer />
    </>
  );
}

export default Home;
