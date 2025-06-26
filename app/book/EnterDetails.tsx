import React, { useState, Dispatch, SetStateAction } from "react";
import { FormDetails, headerStyle } from "./MainClient";

interface EnterDetailsProps {
  setForm: Dispatch<SetStateAction<FormDetails>>;
  form: FormDetails | null;
  selectedCity: string;
  onSubmit: () => void;
}

const EnterDetails: React.FC<EnterDetailsProps> = ({
  setForm,
  form,
  selectedCity,
  onSubmit,
}) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form ||
      !form.name ||
      !form.email ||
      !form.addressLine1 ||
      !form.postcode
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    onSubmit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white p-10 md:p-14 rounded-2xl shadow-xl">
        <h1 className={headerStyle}>Contact Details</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {error && (
            <div className="col-span-full text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone (optional)", type: "tel" },
            { name: "addressLine1", label: "Address Line 1", required: true },
            { name: "addressLine2", label: "Address Line 2 (optional)" },
            { name: "postcode", label: "Postcode", required: true },
          ].map(({ name, label, required = false, type = "text" }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                id={name}
                type={type}
                name={name}
                value={form ? form[name as keyof FormDetails] ?? "" : ""}
                onChange={handleChange}
                required={required}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="col-span-full">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={
                selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)
              }
              disabled
              className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="col-span-full pt-4">
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterDetails;
