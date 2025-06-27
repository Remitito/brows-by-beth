import Image from "next/image";
import ContactForm from "./ContactForm";

const Page = () => {
  return (
    <div className="h-screen justify-center items-center flex-col flex w-full">
      <Image
        src="/images/contactBig.webp"
        alt="Lashes and beauty tools on a pink background"
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="z-10 flex mt-20 items-center justify-center h-full w-full p-4 sm:p-6">
        <ContactForm />
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

export default Page;
