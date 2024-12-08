// src/components/InfoCard.tsx
import React from "react";
import Image from "next/image";

interface InfoCardProps {
  icon: string;
  title: string;
  title2: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, title2 }) => {
  return (
    
    <div className="w-full flex justify-center ">
      <div className=" w-[260px] h-[210px] md:w-[400px] md:h-[250px] border-2 border-[#305041] rounded-xl tracking-wider ">
        {/* icon  */}
        <div className="w-full  mt-6  ">
          <Image aria-hidden src={icon} alt="Icon" width={90} height={90}className="ml-36 md:w-[130px] "/>
        </div>

        {/* text  */}
        <div className="ml-2 md:ml-4">
          <p className="leading-4 md:leading-6 md:text-[30px] text-[24px] font-semibold  mb-2  tracking-widest">
            
            {title} <br /> {title2}
          </p>
        </div>
        <div className="ml-2 md:ml-4">
          <p className="text-[13px] font-medium ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
