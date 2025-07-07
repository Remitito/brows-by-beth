"use server";
import nodemailer from "nodemailer";

interface BookingInfo {
  dateTime: Date;
  email: string;
  name: string;
  service: string;
  cancellationCode: string;
}

export async function sendBooking(bookingInfo: BookingInfo) {
  const { dateTime, email, name, service, cancellationCode } = bookingInfo;

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const cancelUrl = `${process.env.BASE_URL}/book/cancel/${cancellationCode}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email, // Send to the customer
    subject: "Your Booking Confirmation",
    html: `
      <h2>Booking Confirmed</h2>
      <p>Hi ${name},</p>
      <p>Thank you for booking a <strong>${service}</strong> appointment.</p>
      <p><strong>Date & Time:</strong> ${dateTime.toLocaleString()}</p>
      <p>If you need to cancel your appointment, you can click the button below:</p>
      <p><a href="${cancelUrl}" style="padding: 10px 15px; background-color: #e63946; color: white; text-decoration: none; border-radius: 5px;">Cancel Appointment</a></p>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${cancelUrl}</p>
    `,
    replyTo: process.env.EMAIL_FROM,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Booking confirmation email sent successfully!",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, message: "Failed to send booking email." };
  }
}
