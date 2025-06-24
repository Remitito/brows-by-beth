"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const WebNavbar = () => {
  const pathname = usePathname();
  const [logoHover, setLogoHover] = useState(false);
  return (
    <div
      className={`items-center ${
        pathname == "/" && "fixed"
      } hidden md:flex flex-row justify-between w-full z-50 h-[10vh]`}
    >
      {pathname != "/" ? (
        <Link
          href={"/"}
          className="h-full flex justify-center items-center pl-4"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          <Image
            src={logoHover ? "/images/logoHover.webp" : "/images/logo.webp"}
            height={200}
            width={200}
            alt="Brand Logo"
          />
        </Link>
      ) : (
        <div></div>
      )}
      <div className="flex flex-row justify-evenly items-center w-1/2 h-full">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-md ${
              pathname == link.href && "text-pink-600 font-bold"
            } hover:text-pink-600 transition-colors duration-300`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WebNavbar;
