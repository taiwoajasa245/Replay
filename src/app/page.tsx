import BFFSection from "@/components/HomePageComponent/BFFSection";
import EasyToUse from "@/components/HomePageComponent/EasyToUse";
import Footer from "@/components/HomePageComponent/Footer";
import GetStartedSection from "@/components/HomePageComponent/GetStartedSection";
import Hero from "@/components/HomePageComponent/Hero";
import Marquee from "@/components/HomePageComponent/Marquee";
import NavBar from "@/components/HomePageComponent/NavBar";
import UseReplaySection from "@/components/HomePageComponent/UseReplaySection";
import WhatIsReplay from "@/components/HomePageComponent/WhatIsReplay";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="mt-5 mb-16">
          <Hero />
        </div>
        <div className=" mb-16">
          <WhatIsReplay />
        </div>
        <div className="mb-16">
          <EasyToUse />
        </div>
        <div className=" bg-[#305041] text-white font-semibold  mb-16">
          <Marquee text="Capture memories with Replay. Capture memories with Replay. Capture memories with Replay. Capture memories with Replay. Capture memories with Replay. ." />
        </div>
        <div className="mb-20 ">
          <GetStartedSection />
        </div>
        <div className="mb-16">
          <BFFSection />
        </div>
        <div className="mb-16">
          <UseReplaySection />
        </div>
        <div className="mt-10">
          <Footer /> 
        </div>
      </div>
    </>
  );
}
