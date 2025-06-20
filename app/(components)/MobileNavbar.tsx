"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { JSX, useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { navLinks } from "./WebNavbar";
import { FiHome, FiInfo, FiMail, FiBriefcase } from "react-icons/fi";

const iconMap: { [key: string]: JSX.Element } = {
  "/": <FiHome size={24} />,
  "/about": <FiInfo size={24} />,
  "/contact": <FiMail size={24} />,
  "/services": <FiBriefcase size={24} />,
};

const MobileNavbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const OverLay = () => {
    return (
      <div className={`fixed top-0 left-0 h-screen w-screen bg-soft-pink z-40`}>
        <ul className="flex flex-col mt-32 justify-evenly items-center w-full h-1/2">
          {navLinks.map((link) => (
            <li key={link.href} className="flex items-center w-1/2 gap-4 mb-4">
              <Link
                href={link.href}
                className={`text-4xl flex items-center  ${
                  link.href === pathname ? "text-pink-600" : "text-black"
                } font-semibold`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-3xl font-regular pr-4">
                  {iconMap[link.href]}
                </span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full h-full">
        {!isHomePage ? (
          <Link
            href={"/"}
            className="z-50 h-full flex justify-center items-center ml-4"
          >
            <Image
              src={"/logo.webp"}
              height={150}
              width={150}
              className=""
              alt="Brand Logo"
            />
          </Link>
        ) : (
          <div></div>
        )}
        <div className="flex flex-row justify-center items-center w-1/6 h-full">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center z-50 justify-center"
          >
            {!isMenuOpen ? (
              <GiHamburgerMenu size={32} />
            ) : (
              <RxCross2 size={32} />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && <OverLay />}
    </>
  );
};

export default MobileNavbar;
