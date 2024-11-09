import React from "react";
import GetStartedButton from "../common/GetStartedButton";

export default function GetStartedSection() {
  return (
    <div className="w-full ">
      <div>
        <p className="font-TAN_NIMBUS font-normal text-xs md:text-xl text-center text-wrap">
          Capture memories with Replay! Create a private <br className="hidden md:flex" />  gallery, share the link
          with loved ones, and let <br className="hidden md:flex" />  them upload their photos, so you never miss a
          moment.
        </p>
      </div>
      <div className="mt-5">
        <GetStartedButton text="Get Started" />
      </div>
    </div>
  );
}
