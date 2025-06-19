import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  text: string;
  url: string;
  customClass?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  url,
  customClass = "",
}) => {
  return (
    <Link
      href={url}
      className={`border-black lg:p-4 p-2 font-bold border-3 lg:border-3 text-lg lg:text-xl  sm:hover:text-pink-500 sm:hover:border-pink-500 ${customClass}`}
    >
      {text.toUpperCase()}
    </Link>
  );
};

export default LinkButton;
