"use client";

import { useState } from "react";
import { createAppointment } from "@/actions/createAppointment";

export default function AppointmentForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await createAppointment({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        addressLine1: formData.get("addressLine1") as string,
        addressLine2: (formData.get("addressLine2") as string) || undefined,
        city: formData.get("city") as string,
        postcode: formData.get("postcode") as string,
        time: formData.get("time") as string,
        service: Number(formData.get("service")),
        paid: false,
      });
      alert("Appointment created!");
      form.reset();
    } catch (e) {
      setError("Failed to create appointment");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" defaultValue="John Doe" required />
        <input
          name="email"
          type="email"
          defaultValue="john@example.com"
          required
        />
        <input
          name="addressLine1"
          type="text"
          defaultValue="123 Main St"
          required
        />
        <input name="addressLine2" type="text" defaultValue="Apt 4B" />
        <input name="city" type="text" defaultValue="New York" required />
        <input name="postcode" type="text" defaultValue="10001" required />
        <input
          name="time"
          type="datetime-local"
          defaultValue={new Date().toISOString().slice(0, 16)}
          required
        />
        <input name="service" type="number" defaultValue={1} required />
        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
