import Image from "next/image";
import React from "react";

export default function WhatIsReplay() {
  return (
    <section className="w-full p-8">
      <div className="md:hidden">
        <p className="text-center  text-black text-[20px] tracking-[2px] font-extrabold md:text-[39px]">
          WHAT IS REPLAY??
        </p>
      </div>
      <div className="flex md:flex-row-reverse md:justify-center   md:flex  items-center flex-col w-full  ">
        <div className=" mt-11 mb-5 md:my-0 ">
          <Image
            aria-hidden
            src="./section-image.svg"
            alt="menu bar"
            width={250}
            height={250}
            className="md:w-[800px]"
          />
        </div>

        <div className="mr-7">
          <p className="hidden md:flex text-black  tracking-[2px] font-extrabold text-[35px] mb-2">
            WHAT IS REPLAY??
          </p>
          <p className="text-[19px] font-normal md:text-[25px]  md:leading-10 md:tracking-widest">
            Replay makes it easy to relive special moments <br className="hidden md:flex" /> by gathering photos
            from friends and family in one private gallery. Just share a link,
            and let loved ones upload their memories!
          </p>
        </div>
      </div>
    </section>
  );
}
