"use client";

import React, { useState } from "react";
import ChooseCity from "./ChooseCity";
import ChooseService from "./ChooseService";

const MainClient = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {!selectedCity ? (
        <ChooseCity setSelectedCity={setSelectedCity} />
      ) : !selectedService ? (
        <ChooseService setSelectedService={setSelectedService} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
          <h2 className="text-2xl text-gray-700 font-semibold">
            You selected {selectedService} in {selectedCity}.
          </h2>
        </div>
      )}
    </div>
  );
};

export default MainClient;
