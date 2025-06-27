import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="md:h-screen justify-center items-center flex-col flex w-full">
      <Image
        src="/images/contactBig.webp"
        alt="Lashes and beauty tools on a pink background"
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="z-10 flex mt-20 items-center justify-center h-full w-full p-4 sm:p-6">
        <form className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
            Get In Touch
          </h1>

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
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <a
        href="https://www.pexels.com/photo/false-eyelashes-on-pink-surface-8558535/"
        className="absolute bottom-2 right-2 text-gray-400 sm:hover:text-gray-700"
      >
        Photo by Nataliya Vaitkevich
      </a>
    </div>
  );
};

export default page;
