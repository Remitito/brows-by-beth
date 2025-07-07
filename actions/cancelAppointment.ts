"use server";

import dbConnect from "@/lib/dbConnect";
import { Appointment } from "@/lib/models/Appointment";

export async function cancelAppointment(code: string) {
  await dbConnect();

  const deleted = await Appointment.findOneAndDelete({ code });

  if (!deleted) {
    throw new Error("Invalid cancellation code or appointment not found.");
  }
}
