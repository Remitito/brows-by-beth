import React from "react";
import Image from "next/image";
import LinkButton from "@/components/LinkButton";
import { FiPhone, FiMail } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";

const page = () => {
  const PhotoCircle = () => {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="lg:w-96 lg:h-96 h-40 w-40 rounded-full overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/images/portrait.webp"
              alt="Beth"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    );
  };
  const Socials = () => {
    const itemStyles = "flex items-center";
    const iconStyles = "text-black text-xl";
    const textStyles =
      "text-black  text-xs lg:text-sm font-normal  lg:ml-2 pl-2";

    return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="lg:grid mt-12  lg:grid-cols-2 flex flex-col gap-4 ">
          <div className={itemStyles}>
            <FiPhone className={iconStyles} />
            <span className={textStyles}>+447500498677</span>
          </div>
          <div className={itemStyles}>
            <FiMail className={iconStyles} />
            <span className={textStyles}>browsbybethh@gmail.com</span>
          </div>
          <div className={itemStyles}>
            <BsInstagram className={iconStyles} />
            <span className={textStyles}>browsbybeth28</span>
          </div>
          <div className={itemStyles}>
            <SiTiktok className={iconStyles} />
            <span className={textStyles}>browsbybeth28</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-5/6 mt-12 lg:mt-0 flex flex-col lg:flex-row items-center justify-center">
      <div className="flex justify-center items-center w-full lg:w-1/2">
        <PhotoCircle />
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
        <div className="flex flex-col w-full lg:w-3/4 items-center justify-center h-full text-center">
          <h2 className="text-4xl lg:text-6xl mt-2 lg:mt-0 font-normal">
            Hi, I&apos;m Beth!
          </h2>
          <span className="lg:text-xl text-md font-light mt-4">
            Since completing my Brow & Lash Tinting & Brow Waxing qualification
            with Tatti Lashes, I have been offering at-home brow and/or lash
            services in Hereford, Leominster, and Presteigne.
          </span>
          <LinkButton
            text="See My Services"
            url="/services"
            customClass="px-10 mt-6"
          />
        </div>
        <Socials />
      </div>
    </div>
  );
};

export default page;
