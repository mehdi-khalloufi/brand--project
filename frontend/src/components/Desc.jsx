import React from "react";

const Desc = () => {
  return (
    <section className="bg-gray-200 mb-30 ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="max-w-screen-lg text-gray-500 sm:text-lg ">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 ">
            Redefining style at <span className="font-extrabold">Ecliptic</span>{" "}
            worn by thousands worldwide
          </h2>
          <p className="mb-4 font-light">
            Explore a world where fashion meets innovation. Ecliptic offers
            timeless designs and bold collections that empower individuality.
            Our clothing is crafted with precision, using premium materials to
            ensure that every piece not only looks exceptional but feels
            extraordinary.
          </p>
          <p className="mb-4 font-medium">
            Unleash your true style — with collections that break boundaries,
            inspire confidence, and celebrate authenticity. Transform your
            wardrobe with Ecliptic.
          </p>
          <a
            href="#"
            className="inline-flex items-center font-medium text-red-600 hover:text-primary-800 dark:text-primary-500 "
          >
            Learn more
            <svg
              className="ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Desc;
