import dbConnect from "@/lib/dbConnect";
import { Appointment } from "@/lib/models/Appointment";

export interface AppointmentInfo {
  service: string;
  time: string;
}

export async function getAppointmentByCode(
  code: string
): Promise<AppointmentInfo | null> {
  await dbConnect();
  const appointment = await Appointment.findOne({ code });

  if (!appointment) return null;

  return {
    service: appointment.service,
    time: appointment.time.toISOString(),
  };
}
