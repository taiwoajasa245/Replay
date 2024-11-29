import DeveloperCard from "@/components/common/DeveloperCard";
import Footer from "@/components/HomePageComponent/Footer";
import NavBar from "@/components/HomePageComponent/NavBar";
import React from "react";

export default function AboutPage() {
  return (
    <div>
      <NavBar />

      {/* About Replay */}
      <div className="w-full text-center mt-10">
        <h1 className="text-sm md:text-3xl md:mx-24 tracking-wider font-medium poppins-font  ">
          Replay is a collaborative photo platform that simplifies the process
          of sharing and collecting memories. Create a unique gallery link,
          invite friends and family, and watch as their cherished photos
          effortlessly flow into one central hub. No more scattered memories or
          lost photos – Replay brings everyone together to build a shared visual
          story.
        </h1>
      </div>

      {/* Developers of Replay */}

      <div className="mt-8 poppins-font ">
        <h1 className="font-bold md:text-3xl tracking-[10px] text-center">
          {" "}
          DEVELOPERS{" "}
        </h1>
        <p className="font-semibold md:text-lg text-sm tracking-[3px] text-center mt-2">
          {" "}
          Built by the most cracked minds{" "}
        </p>
      </div>

      <div className=" flex md:flex-row flex-col justify-center items-center  gap-10 py-10  md:gap-40  w-full  md:px-40 md:py-24">
        {/* Developer Card */}
        <DeveloperCard
          avaterImage="/kelvin.dev-icon.svg"
          name="Onyenankie Kelvin"
          technology="Backend Engineer & UI/UX Designer"
          gmail="onyenankiekelvin@gmail.com"
          socialLinks={
            {
              email:"onyenankiekelvin@gmail.com",
              instagram: "", 
              twitter: "https://x.com/chisom0x", 
            }
          }
        />
        <DeveloperCard
          avaterImage="/taiwo.dev-image.svg"
          name="Ajasa Taiwo"
          technology="Frontend Engineer"
          gmail="ajasataiwo45@gmail.com"
          socialLinks={
            {
              email:"ajasataiwo45@gmail.com",
              instagram: "", 
              twitter: "https://x.com/Tech_With_Taiwo", 
            }
          }
        />
      </div>

      <Footer />
    </div>
  );
}
