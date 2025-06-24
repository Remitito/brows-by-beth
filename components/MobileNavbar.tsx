"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { JSX, useState, useEffect } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { navLinks } from "./WebNavbar";
import {
  FiHome,
  FiInfo,
  FiMail,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";

const iconMap: { [key: string]: JSX.Element } = {
  "/": <FiHome size={24} />,
  "/about": <FiInfo size={24} />,
  "/contact": <FiMail size={24} />,
  "/services": <FiBriefcase size={24} />,
  "/book": <FiCalendar size={24} />,
};

const MobileNavbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const OverLay = () => {
    return (
      <div className={`fixed h-screen w-screen bg-soft-pink z-40`}>
        <ul className="flex flex-col mt-40 justify-evenly items-center w-full h-1/2">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="flex items-center justify-center w-full gap-4 mb-4"
            >
              <Link
                href={link.href}
                className={`text-2xl w-1/3 font-semibold flex justify-center items-center ${
                  link.href === pathname ? "text-pink-600" : "text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="pr-6">{iconMap[link.href]}</span>
                <span className="w-20"> {link.label} </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div
        className={`flex flex-row justify-between w-full h-full ${
          showNavbar ? "block" : "hidden"
        }`}
      >
        {!isHomePage ? (
          <Link
            href={"/"}
            className="z-50 h-full flex justify-center items-center pl-4"
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
