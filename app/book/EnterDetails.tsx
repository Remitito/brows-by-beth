import React, { useState, Dispatch, SetStateAction } from "react";
import { FormDetails, headerStyle } from "./MainClient";

interface EnterDetailsProps {
  setForm: Dispatch<SetStateAction<FormDetails>>;
  form: FormDetails | null;
  selectedCity: string;
  onSubmit: () => Promise<void> | void;
}

const EnterDetails: React.FC<EnterDetailsProps> = ({
  setForm,
  form,
  selectedCity,
  onSubmit,
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    setError("");
    setIsLoading(true);

    try {
      await onSubmit();
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-5/6 items-center w-full justify-center  px-4">
      <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl p-10 md:p-14">
        <h1 className={headerStyle}>Contact Details</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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

          <div className="col-span-full flex items-center justify-center pt-4">
            {isLoading ? (
              <div className="w-full md:w-1/2 flex justify-center py-3">
                <svg
                  className="animate-spin h-8 w-8 text-pink-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full md:w-1/2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterDetails;
