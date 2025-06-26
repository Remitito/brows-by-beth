import React from "react";
import { prices } from "@/app/services/page";
import { headerStyle } from "./MainClient";

interface ChooseServiceProps {
  setSelectedService: (service: string) => void;
}

const ChooseService: React.FC<ChooseServiceProps> = ({
  setSelectedService,
}) => {
  return (
    <div className="flex flex-col items-center w-full p-8">
      <h1 className={headerStyle}>What service would you like to book?</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {prices.map(({ service, price }) => (
          <div
            key={service}
            onClick={() => setSelectedService(service)}
            className="cursor-pointer group flex justify-between items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all transform hover:scale-105 active:scale-100"
          >
            <span className="text-lg font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
              {service}
            </span>
            <span className="text-lg font-semibold text-pink-600 group-hover:text-pink-800 transition-colors">
              {price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseService;
