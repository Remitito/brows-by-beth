"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const WebNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between w-full h-full">
      {pathname != "/" ? (
        <Link
          href={"/"}
          className="h-full flex justify-center items-center ml-4"
        >
          <Image src={"/logo.webp"} height={200} width={200} alt="Brand Logo" />
        </Link>
      ) : (
        <div></div>
      )}
      <div className="flex flex-row justify-evenly items-center w-1/2 h-full">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-lg font-semibold`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WebNavbar;
