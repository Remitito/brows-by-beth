"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { prices } from "./data";
import { BsInstagram } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";

const Page = () => {
  const [photoIndex, setPhotoIndex] = useState(4);
  const middleHeadings =
    "text-2xl md:text-4xl font-serif text-pink-600 text-center mb-10";
  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev === 6 ? 1 : prev + 1));
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prev) => (prev === 1 ? 6 : prev - 1));
  };

  const Socials = () => {
    const itemStyles = "flex items-center";
    const iconStyles = "text-pink-600 text-2xl";
    const linkStyles =
      "text-gray-700 hover:text-pink-600 text-base md:text-lg font-medium ml-3 transition-colors";

    return (
      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-16 items-center justify-center w-full">
        <a
          href="https://www.instagram.com/browsbybeth28/?hl=en"
          className={itemStyles}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsInstagram className={iconStyles} />
          <span className={linkStyles}>browsbybeth28</span>
        </a>
        <a
          href="https://www.tiktok.com/@browsbybeth28"
          className={itemStyles}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiTiktok className={iconStyles} />
          <span className={linkStyles}>browsbybeth28</span>
        </a>
      </div>
    );
  };

  return (
    <div className="w-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <div className="relative w-full bg-pink-50 flex items-center min-h-[150px] md:min-h-[250px]  overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-7xl text-gray-700 font-serif italic">
            Services
          </h1>
        </div>
        <Image
          src="/images/bannerNew.png"
          alt="Female Model"
          width={500}
          height={400}
          priority
          className="absolute md:flex right-20 hidden bottom-0 w-[30%]   pointer-events-none translate-y-[30%] lg:translate-y-[50%]  3xl:translate-y-[40%] "
        />
        <Image
          src="/images/bannerHigh.webp"
          alt="Female Model"
          width={500}
          height={400}
          priority
          className="absolute md:hidden w-full pointer-events-none"
        />
      </div>

      <div className="flex flex-col items-center w-full space-y-16 py-16 px-4">
        <div className="w-full max-w-3xl">
          <h2 className={middleHeadings}>Price List</h2>
          <div className="space-y-5">
            {prices.map((item, index) => (
              <div
                key={index}
                className="flex md:text-lg justify-between items-baseline pb-3 border-b border-gray-300 border-dotted"
              >
                <p className=" text-gray-700">{item.service}</p>
                <p className="font-semibold text-gray-900">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:max-w-4xl  md:p-8 flex flex-col items-center">
          <h2 className={middleHeadings}>Gallery</h2>
          <div className="flex items-center justify-center w-full md:-mx-8">
            <button
              onClick={handlePrevPhoto}
              aria-label="Previous Photo"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoIosArrowBack className="text-4xl cursor-pointer text-gray-500 hover:text-pink-600 transition" />
            </button>
            <div className="relative w-full h-60 md:h-auto aspect-[4/3] md:aspect-[16/9] mx-2 sm:mx-4 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={`/images/samples/${photoIndex}.webp`}
                alt={`Sample Photo ${photoIndex}`}
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={handleNextPhoto}
              aria-label="Next Photo"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoIosArrowForward className="text-4xl cursor-pointer text-gray-500 hover:text-pink-600 transition" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-16 flex flex-col items-center justify-center bg-white border-t border-gray-200">
        <h3 className="text-4xl font-serif text-gray-900 mb-10 text-center px-4">
          Follow My Work
        </h3>
        <Socials />
      </div>
    </div>
  );
};

export default Page;
