"use client";

import React, { useState, useEffect } from "react";
import ChooseCity from "./ChooseCity";
import ChooseService from "./ChooseService";
import ChooseTime from "./ChooseTime";
import EnterDetails from "./EnterDetails";
import { BookingProgressBar } from "./BookingProgressBar";
import { createAppointment } from "@/actions/createAppointment";
import { getAppointments } from "@/actions/getAppointments";

export interface FormDetails {
  name: string;
  email: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  postcode: string;
}

export const headerStyle =
  "text-3xl md:text-4xl font-serif text-pink-600 text-center mb-10";

const MainClient = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<Date | null>();
  const [form, setForm] = useState<FormDetails>({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    postcode: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [unavailableTimes, setUnavailableTimes] = useState<Date[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const successCont =
    "text-center h-1/2  flex justify-center items-center flex-col mt-20 md:mt-0 max-w-lg mx-auto";
  useEffect(() => {
    if (selectedCity && selectedService) {
      const fetchUnavailableTimes = async () => {
        setIsLoadingAvailability(true);
        try {
          const times = await getAppointments(selectedCity);
          const dateObjects = times.map((time) => new Date(time));
          setUnavailableTimes(dateObjects);
        } catch (error) {
          console.error("Failed to load appointments:", error);
        } finally {
          setIsLoadingAvailability(false);
        }
      };

      fetchUnavailableTimes();
    }
  }, [selectedCity, selectedService]);

  const steps = ["City", "Service", "Time", "Details", "Confirm"];

  let currentStep = 0;
  if (selectedCity) currentStep = 1;
  if (selectedService) currentStep = 2;
  if (selectedTime) currentStep = 3;
  if (success) currentStep = 5;

  const goToStep = (stepIndex: number) => {
    if (success || error) return;

    if (stepIndex < 3) {
      setSelectedTime(null);
    }
    if (stepIndex < 2) {
      setSelectedService("");
    }
    if (stepIndex < 1) {
      setSelectedCity("");
    }
  };

  const handleFormSubmit = async () => {
    try {
      await createAppointment({
        name: form.name,
        email: form.email,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2 || undefined,
        city: selectedCity,
        postcode: form.postcode,
        time: selectedTime ? selectedTime.toISOString() : "",
        service: selectedService,
        paid: false,
      });
      setSuccess(true);
      setError(false);
    } catch (e) {
      setError(true);
      setSuccess(false);
      console.error(e);
    }
  };

  const ErrorScreen = () => (
    <div className={successCont}>
      <h2 className="text-3xl font-serif text-red-600 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-8">
        There was an error submitting your appointment. Please try again or
        contact me directly to book.
      </p>
      <button
        onClick={() => setError(false)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform hover:scale-105"
      >
        Try Again
      </button>
    </div>
  );

  const SuccessScreen = () => (
    <div className={successCont}>
      <h2 className="text-4xl font-serif text-pink-600 mb-4">
        Appointment Confirmed!
      </h2>
      <p className="text-gray-600 text-md">
        Thank you for booking. A confirmation email is on its way to you.
      </p>
    </div>
  );

  const LoadingScreen = () => (
    <div className="text-center mt-10 md:mt-0">
      <h2 className="text-2xl font-serif text-gray-700 mb-2">
        Loading Availability...
      </h2>
      <p className="text-gray-500">Checking the calendar for you.</p>
    </div>
  );

  const renderContent = () => {
    if (success) {
      return <SuccessScreen />;
    }
    if (error) {
      return <ErrorScreen />;
    }
    if (!selectedCity) {
      return <ChooseCity setSelectedCity={setSelectedCity} />;
    }
    if (!selectedService) {
      return <ChooseService setSelectedService={setSelectedService} />;
    }
    if (isLoadingAvailability) {
      return <LoadingScreen />;
    }
    if (!selectedTime) {
      return (
        <ChooseTime
          setSelectedTime={setSelectedTime}
          unavailableTimes={unavailableTimes}
        />
      );
    }
    return (
      <EnterDetails
        setForm={setForm}
        form={form}
        selectedCity={selectedCity}
        onSubmit={handleFormSubmit}
      />
    );
  };

  return (
    <div className="w-full min-h-dvh md:h-screen bg-gray-50 text-gray-800 font-sans flex flex-col items-center py-8">
      <BookingProgressBar
        steps={steps}
        currentStep={currentStep}
        goToStep={goToStep}
        isCompleted={success}
      />
      <div className="flex flex-col h-5/6  flex-grow w-full px-4 ">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainClient;
