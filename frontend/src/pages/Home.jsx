import React from "react";
import { useState } from "react";
// import Hero from "./components/hero.jsx";
import Masonry from "../components/Masonry.jsx";
import CircularGallery from "../components/CircularGallery.jsx";
import ScrollVelocity from "../components/ScrollVelocity.jsx";
import Footer from "../components/Footer.jsx";
import Desc from "../components/Desc.jsx";
import Hero from "../components/Hero.jsx";
const Home = () => {
  const [count, setCount] = useState(0);
  const data = [
    { id: 1, image: "./photos/pic2.jpg", height: 400 },
    { id: 2, image: "./photos/pic3.png", height: 300 },
    { id: 3, image: "./photos/pic4.png", height: 400 },
    { id: 4, image: "./photos/pic6.png", height: 600 },
    { id: 5, image: "./photos/pic7.png", height: 400 },
    { id: 10, image: "./photos/pic5.png", height: 400 },
    { id: 6, image: "./photos/pic8.png", height: 300 },
    { id: 8, image: "./photos/pic9.png", height: 300 },
    { id: 9, image: "./photos/pic10.png", height: 300 },
  ];

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <>
      <Hero />
      <Masonry data={data} />
      <div className="py-10"></div>

      <Desc />

      <ScrollVelocity
        texts={["Ecliptic", "Beyond Boundaries"]}
        velocity={100}
        className=" h1-font1 custom-scroll-text"
      />

      {/* 
        <h1
          data-aos="fade-left"
          className="h1-font1 text-7xl text-center p-10 my-5 font-bold"
        >
          ECLIPTIC PRODUCTS
        </h1> */}

      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>

      <Footer />
    </>
  );
};

export default Home;
