import React from "react";

const Hero = () => {
  return (
    <main className=" bg-white relative overflow-hidden h-screen">
      <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-gray-800  font-black text-3xl h1-font1">
            <img
              src="./photos/logo1.png"
              className="w-10  mr-2 inline-block"
              alt="logo"
            ></img>
            ECLIPTIC
          </div>
          <div className="flex items-center">
            <nav className="font-sen text-gray-800  uppercase text-lg lg:flex items-center hidden">
              <a href="#" className="py-2 px-6 flex">
                Home
              </a>
              <a href="#" className="py-2 px-6 flex">
                Watch
              </a>
              <a href="#" className="py-2 px-6 flex">
                Product
              </a>
              <a href="#" className="py-2 px-6 flex">
                Contact
              </a>
            </nav>
            <button className="lg:hidden flex flex-col ml-4">
              <span className="w-6 h-1 bg-gray-800  mb-1"></span>
              <span className="w-6 h-1 bg-gray-800  mb-1"></span>
              <span className="w-6 h-1 bg-gray-800  mb-1"></span>
            </button>
          </div>
        </div>
      </header>
      <div className="bg-white  flex relative z-20 items-center overflow-hidden">
        <div className="container mx-auto px-6 flex relative py-16">
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
            <span className="w-20 h-2 bg-gray-800  mb-12"></span>
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none  text-gray-800">
              Beyond Boundaries
            </h1>
            <p className="text-sm sm:text-base text-gray-700 ">
              Ecliptic brings the universe to your wardrobe with bold,
              celestial-inspired designs. Crafted for those who dare to explore
              the unknown, our collection blends timeless fashion with a touch
              of cosmic wonder.
            </p>
            <div className="flex mt-8">
              <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-red-600 border-2 border-transparent text-white text-md mr-4 hover:bg-white hover:text-red-600 hover:border-red-600 transition duration-300 ease-in-out"
              >
                Shop
              </a>
              <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-red-600 text-red-600  hover:bg-red-600 hover:text-white text-md transition duration-300 ease-in-out"
              >
                Read more
              </a>
            </div>
          </div>
          <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
            <img src="/photos/im1.png" className="max-w-xs md:max-w-sm ml-80" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
