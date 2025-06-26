"use server";

import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/lib/models/User";
import { Appointment } from "@/lib/models/Appointment";

interface AppointmentInput {
  name: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  time: string; // ISO date string
  service: string;
  paid?: boolean; // may need later
}

export async function createAppointment(data: AppointmentInput) {
  await dbConnect();

  let user = await User.findOne({ email: data.email });
  if (!user) {
    user = new User({
      name: data.name,
      email: data.email,
    });
    await user.save();
  }

  //  secure random code used for edit/cancelling appointment
  const code = crypto.randomBytes(16).toString("hex");

  const appointment = new Appointment({
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    city: data.city,
    postcode: data.postcode,
    time: new Date(data.time),
    user: user._id, // link appointment to the user
    service: data.service,
    paid: data.paid ?? false,
    code,
  });

  await appointment.save();

  return {
    addressLine1: appointment.addressLine1,
    addressLine2: appointment.addressLine2,
    city: appointment.city,
    postcode: appointment.postcode,
    time: appointment.time.toISOString(),
    service: appointment.service,
    paid: appointment.paid,
    code,
  };
}
