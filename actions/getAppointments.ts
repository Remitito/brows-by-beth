"use server";

import dbConnect from "@/lib/dbConnect";
import { Appointment } from "@/lib/models/Appointment";

export const getAppointments = async (currentCity: string): Promise<Date[]> => {
  try {
    await dbConnect();

    const appointments = await Appointment.find({
      time: { $gte: new Date() },
    })
      .select("time city")
      .lean();

    const unavailableSlots: Date[] = [];

    appointments.forEach((apt) => {
      const appointmentTime = new Date(apt.time);

      // block the actual appointment time itself
      unavailableSlots.push(appointmentTime);

      // if new appointment in a different city, add travel buffer (1 hr either side)
      if (apt.city !== currentCity) {
        const timeBefore = new Date(appointmentTime.getTime() - 60 * 60 * 1000);
        unavailableSlots.push(timeBefore);

        const timeAfter = new Date(appointmentTime.getTime() + 60 * 60 * 1000);
        unavailableSlots.push(timeAfter);
      }
    });

    return unavailableSlots;
  } catch (error) {
    console.error("Failed to fetch appointments with travel buffer:", error);
    throw new Error("Could not fetch appointment availability.");
  }
};
