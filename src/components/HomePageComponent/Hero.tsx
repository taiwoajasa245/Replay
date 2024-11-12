import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="w-full md:my-36">
      <div className="m-5">
        {/* Hero header */}
        <div>
          <p className="font-TAN_NIMBUS text-[19px] text-center md:text-[45px] md:animate-fade-up ">
            Capture and Share Your <br /> Special Moments, Privately
          </p>
        </div>

        {/* Hero title */}
        <div className="my-5">
          <p className="text-center font-medium text-[10px] font-poppins md:text-[20px] md:animate-fade-down md:animate-delay-500 md:animate-normal">
            Your Photos, Your Privacy. Our Commitment. A Secure and
            User- <br /> Friendly Photo Sharing Solution
          </p>
        </div>

        {/* Hero desktop button */}
        <div className="hidden md:flex justify-center animate-fade-down animate-delay-75 animate-normal">
          <Link href="/signup" className="flex items-center ">
            <div className="flex items-center bg-[#305041] rounded-full   hover:bg-[#216746] transition-all">
              <span className="px-7 py-3 text-white text-[25px] text-nowrap font-semibold ">
                Get Started
              </span>
              <div className="bg-white rounded-full  m-1 p-1">
              
                <Image
                  aria-hidden
                  src="/Arrow-right.svg"
                  alt="Arrow right"
                  width={100}
                  height={100}
                  className="w-[80px] h-[45px] hover:animate-jump-in " 
                /> 
              </div>
            </div>
          </Link>
        </div>

        {/* Hero mobile button */}
        <div className="flex md:hidden justify-center  ">
          <Link
            href="/signup"
            className="flex items-center bg-[#305041] rounded-full w-[155px] h-[40px]"
          >
            <span className="px-4 py-2 text-white text-[15px] font-semibold ">Get Started</span>
            <div className="bg-white rounded-full p-1">
              <Image
                aria-hidden
                src="/Arrow-right.svg"
                alt="Arrow right"
                width={100}
                height={100}
                className="w-[45px] h-[20px]"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
