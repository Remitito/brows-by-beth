import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  text: string;
  url: string;
  customClass?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, url, customClass }) => {
  return (
    <Link
      href={url}
      className={`border-black lg:p-3 p-2 font-bold border-[2px] text-lg  transition-colors duration-300 sm:hover:text-pink-600 sm:hover:border-pink-600 ${customClass}`}
    >
      {text.toUpperCase()}
    </Link>
  );
};

export default LinkButton;
