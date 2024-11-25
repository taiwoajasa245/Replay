"use client";

type Stats = {
  totalGalleries: number;
  totalFiles: number;
};

type StatsProps = {
  stats: Stats;
};

export default function StatsComponentPage({ stats }: StatsProps) {
  return (
    <div className=" flex flex-col md:flex-row md:justify-evenly h-screen items-center pt-32 gap-8 font-TAN_NIMBUS ">

      {/* Total Galleries */}
      <div className="md:h-60 md:w-80  md:flex flex-col justify-between">
        <p className="text-black font-medium text-[20px] md:text-left text-center mb-10 md:mb-0">
          Total Galleries
        </p>
        <div className="flex-grow flex justify-center items-center">
          <p className="text-[#305041] text-center font-bold text-[60px]">
            {stats.totalGalleries}
          </p>
        </div>
      </div>

     <div className="hidden md:block">
       {/* Vertical Line */}
       <div className="h-72 w-px bg-black "></div>
     </div>

     
     <div className=" md:hidden">
       {/* Horizontal Line */}
       <div className="w-60 h-px bg-black "></div>
     </div>

      {/* Total Files */}
      <div className="md:h-60 md:w-80   md:flex flex-col justify-between">
        <p className="text-black font-medium text-[20px] text-center md:text-left mb-10 md:mb-0">
          Total Files
        </p>
        <div className="flex-grow flex justify-center items-center">
          <p className="text-[#305041] text-center font-bold text-[60px]">
            {stats.totalFiles}
          </p>
        </div>
      </div>
    </div>
  );
}
