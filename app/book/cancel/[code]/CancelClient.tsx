"use client";

import { useState } from "react";
import { cancelAppointment } from "@/actions/cancelAppointment";

interface CancelPageProps {
  appointment: {
    service: string;
    time: string;
  };
  code: string;
}

export default function CancelClient({ appointment, code }: CancelPageProps) {
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = async () => {
    try {
      await cancelAppointment(code);
      setCancelled(true);
    } catch (err) {
      console.error("Cancellation failed", err);
    }
  };

  if (cancelled) {
    return (
      <div className="p-6 flex flex-col justify-center items-center h-[60vh] w-screen">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Appointment Cancelled
        </h1>
        <p>Your appointment has been successfully cancelled.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col justify-center items-center h-[60vh] w-screen">
      <h1 className="text-2xl font-bold mb-4">Cancel Appointment</h1>
      <p>
        You’re about to cancel your appointment for{" "}
        <strong>{appointment.service}</strong> on{" "}
        <strong>{new Date(appointment.time).toLocaleString()}</strong>.
      </p>

      <button
        onClick={handleCancel}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Confirm Cancellation
      </button>
    </div>
  );
}
