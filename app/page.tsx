"use client";
import Image from "next/image";
import LinkButton from "@/components/LinkButton";

export default function Home() {
  return (
    <div className="flex h-screen w-full lg:items-center justify-center p-6 lg:justify-start lg:p-0 lg:pl-[5%]">
      <div
        className="absolute inset-0 hidden bg-cover lg:block"
        style={{
          backgroundImage: "url('/images/heroImage.webp')",
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute inset-0 block bg-cover bg-center lg:hidden"
        style={{
          backgroundImage: "url('/images/mobileHeroImage.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <a
        className="lg:hidden block absolute right-4 bottom-4 text-xs text-gray-500 lg:hover:text-gray-700 z-50"
        href="https://www.pexels.com/photo/woman-with-her-hand-on-her-face-4725426/"
      >
        Photo by Polina Tankilevitch
      </a>

      <div className="absolute inset-0 bg-pink-100 opacity-80 lg:bg-[#fbd8ee] lg:opacity-75" />

      <div className="relative z-10 sm:pt-0 pt-16 flex w-full max-w-md flex-col items-center text-center lg:max-w-lg lg:text-left">
        <div className="relative w-3/4 lg:h-20 h-16">
          <Image
            src="/logo.webp"
            alt="Brand Logo"
            fill
            className="object-fill"
            priority
          />
        </div>
        <h2 className="mt-4 text-xl font-medium text-center leading-tight lg:text-2xl">
          Fully Qualified and Insured
          <span className="block">Tint and Brow Stylist</span>
        </h2>
        <h3 className=" text-sm text-center text-gray-600">
          (Based in Hereford and Presteigne)
        </h3>
        <LinkButton
          text="BOOK NOW"
          url="/book"
          customClass="mt-6 flex w-2/3 max-w-xs items-center justify-center lg:w-1/2 lg:mt-8"
        />
      </div>
    </div>
  );
}
