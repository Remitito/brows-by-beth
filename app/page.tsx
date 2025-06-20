"use client";
import Image from "next/image";
import LinkButton from "./(components)/LinkButton";

export default function Home() {
  return (
    <div className="relative w-screen justify-center items-center flex h-screen">
      {/* Background image + overlay */}
      <div
        className="absolute lg:flex hidden inset-0 "
        style={{
          backgroundImage: "url('/heroImage.webp')",
          backgroundSize: "100%",
          backgroundPosition: "80% 0%",
        }}
      />
      <div
        className="absolute flex lg:hidden inset-0 "
        style={{
          backgroundImage: "url('/heroImage.webp')",
          backgroundSize: "500%",
          backgroundPosition: "82% 15%",
        }}
      />
      <div className="absolute inset-0 lg:bg-[#fbd8ee] bg-pink-100 opacity-80 lg:opacity-75" />
      {/* Left side cont */}
      <div className="z-40 absolute lg:left-[5%] top-[10%] lg:top-[20%]  flex items-center justify-center gap-4 p-8 ">
        <div className="flex flex-col h-full text-center items-center justify-center">
          <Image src={"/logo.webp"} width={600} height={200} alt="Brand Logo" />
          <h2 className="text-2xl lg:text-3xl">
            Fully Qualified and Insured <br></br> Tint and Brow Stylist
          </h2>
          <h3 className="text-sm lg:text-lg text-gray-600">
            (Based in Hereford and Presteigne)
          </h3>
          <LinkButton
            text="BOOK NOW"
            url="/book"
            customClass="sm:flex items-center justify-center hidden mt-6 w-1/2"
          />
        </div>
        {/* Mobile button */}
        <LinkButton
          text="BOOK NOW"
          url="/book"
          customClass="sm:hidden flex w-2/3 justify-center items-center absolute top-[150%] "
        />
      </div>
    </div>
  );
}
