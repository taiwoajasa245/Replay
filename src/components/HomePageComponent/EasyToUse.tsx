import React from "react";
import Stepper from "./Stepper";

export default function EasyToUse() {
  return (
    <section className="w-full">
      <div className="mx-5">
        <div>
          <p className="text-center  font-extrabold text-[20px] tracking-[2px] md:text-[35px]"> It&apos;s pretty easy to use </p>
        </div>

        <div className="mt-8 ml-6 ">
          <Stepper />
        </div>
      </div>
    </section>
  );
}
