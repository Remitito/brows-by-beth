"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LinkButton from "@/components/LinkButton";
import { prices } from "./data";

const Page = () => {
  const subHeaderStyle =
    "hidden md:flex justify-center items-center text-center w-full h-1/4 md:my-0 my-6 text-3xl font-light";

  const [photoIndex, setPhotoIndex] = useState(1);

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev == 6 ? 1 : prev + 1));
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prev) => (prev == 1 ? 6 : prev - 1));
  };

  const BannerPhoto = ({ index }: { index: number }) => {
    return (
      <div className="relative md:w-1/4 w-1/3  ">
        {" "}
        <Image
          fill
          className="object-cover"
          src={`/images/banner/${index}.webp`}
          alt={`Banner ${index}`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen md:min-h-full  md:h-full w-full flex flex-col">
      {/* Mobile banner */}

      <div className="flex flex-row h-12 md:hidden">
        {[2, 3, 1].map((index) => (
          <BannerPhoto key={index} index={index} />
        ))}
      </div>

      {/* Web banner*/}
      <div className="hidden md:flex flex-row h-[20vh]">
        {[3, 2, 1, 4].map((index) => (
          <BannerPhoto key={index} index={index} />
        ))}
      </div>
      <div className="flex md:h-[70vh] flex-col md:flex-row items-center">
        {/* Info Section Mobile  */}
        <div className="flex md:hidden flex-col items-center w-full text-center">
          <h1 className="text-4xl mt-8 mb-2">Services</h1>
          <span className="font-light mb-6 w-[90%] text-md">
            I offer call-out brow & lash tinting and brow waxing in Hereford,
            Leominster and Presteigne, with discounts available for combined
            treatments.{" "}
          </span>
        </div>
        {/* Price List */}
        <div className="flex flex-col w-full md:w-1/3 mb-8 h-full">
          <h2 className={`${subHeaderStyle}`}>Prices</h2>

          <div className="flex flex-col items-center justify-center md:h-3/5">
            <table className="w-3/4 text-left">
              <tbody className="md:text-lg font-light">
                {prices.map((item, index) => (
                  <tr key={index} className="">
                    <td className="px-4 md:px-6 md:py-4 py-2">
                      {item.service}
                    </td>
                    <td className="px-4 md:px-6 md:py-4 py-2 text-left">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <LinkButton
              text={"Book Now"}
              url={"/book"}
              customClass="text-sm mt-6 px-6 mb-6 md:hidden"
            />
          </div>
        </div>
        {/* Info Section Web  */}
        <div className="hidden md:flex flex-col items-center w-1/3 text-center">
          <h1 className="text-6xl">Services</h1>
          <span className="font-light mb-10 w-5/6 text-xl mt-8">
            I offer call-out brow & lash tinting and brow waxing in Hereford or
            Presteigne, with discounts available for combined treatments.{" "}
          </span>
          <LinkButton text={"Make an Appointment"} url={"/book"} />
        </div>
        {/* Gallery */}
        <div className="flex flex-col md:w-1/3 w-full h-52 md:h-full  mb-8">
          <h2 className={`${subHeaderStyle}`}>Gallery</h2>
          <div className="flex flex-row items-center justify-center md:h-3/5 h-full">
            <IoIosArrowBack
              onClick={() => handlePrevPhoto()}
              className="text-3xl cursor-pointer md:hover:text-pink-600"
            />
            <div className="relative h-full flex rounded-4xl w-full md:w-4/6 mx-6 overflow-hidden">
              <Image
                fill
                alt={`Sample Photo ${photoIndex}`}
                src={`/images/samples/${photoIndex}.webp`}
                className="object-cover"
              />
            </div>
            <IoIosArrowForward
              onClick={() => handleNextPhoto()}
              className="text-3xl cursor-pointer md:hover:text-pink-600"
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Page;
