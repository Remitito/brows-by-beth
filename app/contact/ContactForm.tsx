"use client";

import { useState } from "react";
import { sendEmail } from "@/actions/sendEmail";
import { middleHeadings } from "../services/page";
const ContactForm = () => {
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;

    setDisabled(true);

    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    setStatus(result);

    if (result.success) {
      e.currentTarget.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md"
    >
      <h1 className={`${middleHeadings} text-center`}>Get In Touch</h1>

      {status && (
        <div
          className={`mb-4 text-center font-semibold text-sm p-2 rounded ${
            status.success
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          disabled={disabled}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          disabled={disabled}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          disabled={disabled}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
