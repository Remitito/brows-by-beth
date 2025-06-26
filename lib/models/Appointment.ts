import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./User";

export interface IAppointment extends Document {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  time: Date;
  user: mongoose.Types.ObjectId | IUser;
  service: string;
  paid: boolean;
  code: string;
}

const AppointmentSchema: Schema = new Schema<IAppointment>(
  {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    time: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: String, required: true },
    paid: { type: Boolean, default: false },
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

AppointmentSchema.index({ user: 1 });

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
