"use client";

import { useState } from "react";
import Link from "next/link";
import GetStartedButton from "../common/GetStartedButton";

const AnimatedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="z-50 p-2"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div
          className={`w-6 h-0.5 bg-black transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-black mt-1.5 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-black mt-1.5 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></div>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#305041] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full justify-center items-center space-y-8 text-white">
          <Link
            href="/"
            className="text-xl hover:text-gray-600 transition-colors "
          >
            About
          </Link>
          <Link
            href="/"
            className="text-xl hover:text-gray-600 transition-colors"
          >
            Social
          </Link>
          <Link
            href="/about"
            className="text-xl hover:text-gray-600 transition-colors"
          >
            Contact
          </Link>

          {/* // button */}
          <div className="">
            <div className="w-full flex justify-center ">
              <Link
                href="/login"
                className=" px-8 py-2 text-[15px] text-white bg-[#305041] cursor-pointer hover:bg-[#216746] hover:text-white border border-white rounded-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent h-full  z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default AnimatedMenu;
