"use client";

import React from "react";
import Image from "next/image";

interface ChooseCityProps {
  setSelectedCity: (city: string) => void;
}

const ChooseCity: React.FC<ChooseCityProps> = ({ setSelectedCity }) => {
  interface City {
    name: string;
    photoUrl: string;
    photoCredit: string;
  }

  const cities: City[] = [
    {
      name: "hereford",
      photoUrl:
        "https://commons.wikimedia.org/wiki/File:The_Wye_Bridge_and_Hereford_Cathedral_-_geograph.org.uk_-_5668005.jpg",
      photoCredit: "Philip Halling",
    },
    {
      name: "leominster",
      photoUrl: "https://commons.wikimedia.org/wiki/File:Leominster_Priory.jpg",
      photoCredit: "Tony Grist",
    },
    {
      name: "presteigne",
      photoUrl: "https://commons.wikimedia.org/wiki/File:Presteigne.jpg",
      photoCredit: "Richard Webb",
    },
  ];

  return (
    <div className="flex flex-col items-center  w-full p-8 ">
      <h1 className="text-4xl md:text-5xl font-semibold text-center mb-20 md:mb-20 text-gray-800">
        Where are you based?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {cities.map((city) => (
          <div
            key={city.name}
            onClick={() => setSelectedCity(city.name)}
            className={`cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white  border-transparent hover:border-gray-300`}
          >
            <Image
              src={`/images/cities/${city.name}.webp`}
              alt={`Image of ${city.name}`}
              height={300}
              width={400}
              className="object-cover w-full h-60"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-normal capitalize text-gray-700">
                {city.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseCity;
