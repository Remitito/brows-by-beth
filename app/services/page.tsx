"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { prices } from "./data";
import { BsInstagram } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";

const Page = () => {
  const middleContStyle =
    "w-11/12 md:w-1/3 min-h-[350px] bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex flex-col justify-between";
  const [photoIndex, setPhotoIndex] = useState(4);

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev === 6 ? 1 : prev + 1));
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prev) => (prev === 1 ? 6 : prev - 1));
  };

  const Socials = () => {
    const itemStyles = "flex items-center";
    const iconStyles = "text-pink-600 text-xl";
    const linkStyles =
      "text-gray-700 md:hover:text-pink-600 text-sm md:text-base font-medium ml-2";

    return (
      <div className="flex flex-row space-x-20 items-center justify-center w-full">
        <div className={itemStyles}>
          <BsInstagram className={iconStyles} />
          <a
            className={linkStyles}
            href="https://www.instagram.com/browsbybeth28/?hl=en"
          >
            browsbybeth28
          </a>
        </div>
        <div className={itemStyles}>
          <SiTiktok className={iconStyles} />
          <a
            className={linkStyles}
            href="https://www.tiktok.com/@browsbybeth28"
          >
            browsbybeth28
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-screen flex flex-col  text-gray-800">
      <div className="relative w-full h-[20vh] md:h-[40vh]">
        <Image
          src="/images/bannerCloseUpZoomed.webp"
          alt="Banner"
          fill
          className="object-cover brightness-75  opacity-80"
        />
        <div className="absolute inset-0 flex items-center  justify-center">
          <h1 className="text-5xl md:text-7xl text-white font-semibold">
            Services
          </h1>
        </div>
      </div>

      {/* <div className="pt-6 px-6">
        <p className="text-center text-base md:text-lg font-light max-w-xl mx-auto">
          Since completing my Brow & Lash Tinting & Brow Waxing qualification
          with Tatti Lashes, I have been offering at-home brow and/or lash
          services in Hereford, Leominster, and Presteigne.
        </p>
      </div> */}

      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-evenly gap-10 py-12">
        {/* Prices */}
        <div className={middleContStyle}>
          <h2 className="text-3xl font-semibold text-pink-600 text-center mb-6">
            Prices
          </h2>
          <table className="w-full text-left">
            <tbody className="divide-y divide-gray-200">
              {prices.map((item, index) => (
                <tr key={index} className="text-sm md:text-base">
                  <td className="py-3">{item.service}</td>
                  <td className="py-3 text-right">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gallery */}
        <div className={middleContStyle}>
          <h2 className="text-3xl font-semibold text-pink-600 text-center mb-6">
            Gallery
          </h2>

          <div className="flex items-center justify-center flex-grow">
            <IoIosArrowBack
              onClick={handlePrevPhoto}
              className="text-3xl cursor-pointer text-gray-500 hover:text-pink-600 transition"
            />
            <div className="relative w-[300px] h-[200px] mx-4 md:mx-10 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={`/images/samples/${photoIndex}.webp`}
                alt={`Sample Photo ${photoIndex}`}
                fill
                className="object-cover"
              />
            </div>
            <IoIosArrowForward
              onClick={handleNextPhoto}
              className="text-3xl cursor-pointer text-gray-500 hover:text-pink-600 transition"
            />
          </div>
        </div>
      </div>

      <div className="py-12 flex flex-col items-center justify-center bg-white">
        <h3 className="text-3xl font-semibold text-gray-900 mb-8">
          Follow me on socials
        </h3>
        <Socials />
      </div>
    </div>
  );
};

export default Page;
