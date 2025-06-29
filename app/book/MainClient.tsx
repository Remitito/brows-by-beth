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

export const headerStyle = "text-3xl  text-center mb-10 text-gray-800";

const MainClient = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
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
  if (success) currentStep = 4;

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
    <div className="mt-20 md:mt-0 text-center">
      <h2 className="text-red-600 text-2xl font-bold mb-4">
        Something went wrong.
      </h2>
      <p className="mb-6">
        There was an error submitting your appointment. Please try again or
        contact me directly to book.
      </p>
      <div className="flex flex-row w-full justify-evenly items-center">
        <button
          onClick={() => setError(false)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded mb-4"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const SuccessScreen = () => (
    <div className="text-center  mt-20 md:mt-0 w-2/3 md:w-full max-w-lg flex flex-col justify-center items-center">
      <h2 className="text-green-600 text-2xl md:text-4xl font-bold mb-4">
        Appointment Confirmed!
      </h2>
      <p className="mb-6 md:text-lg">
        Thank you for booking your appointment, your details will be sent to
        your email.
      </p>
    </div>
  );

  const LoadingScreen = () => (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Loading Availability...</h2>
      <p>Checking the calendar for you.</p>
    </div>
  );

  const renderContent = () => {
    if (success) {
      return <ErrorScreen />;
    }
    if (error) {
      return <SuccessScreen />;
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
    <div className="flex flex-col items-center w-full h-full">
      <BookingProgressBar
        steps={steps}
        currentStep={currentStep}
        goToStep={goToStep}
        isCompleted={success}
      />
      <div className="flex flex-col items-center justify-center flex-grow w-full mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainClient;
