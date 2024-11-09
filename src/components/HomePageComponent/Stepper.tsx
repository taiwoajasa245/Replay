import React from "react";

export default function Stepper() {
  return (
    <div>
      <ol className="relative md:ml-7   text-white md:text-[20px] ">
        <li className="mb-10 ms-6 md:ms-11">
          <span className="absolute right-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12  bg-[#305041] rounded-full -start-4 ring-4  ">
            <div> 1</div>
          </span>
          <h3 className="font-medium leading-tight text-black ">Create an account</h3>
          <p className="text-sm text-black ">Start by create an account to access your photo any where in the world </p>
        </li>

        <li className="mb-10 ms-6 md:ms-11">
          <span className="absolute flex items-center justify-center w-8 h-8 md:w-12 md:h-12  bg-[#305041] rounded-full -start-4 ring-4">
            <div> 2 </div>
          </span>
          <h3 className="font-medium leading-tight text-black">Create a gallery </h3>
          <p className="text-sm text-black">In your dashboard click on the Create gallery button </p>
        </li>

        <li className="mb-10 ms-6 md:ms-11">
          <span className="absolute flex items-center justify-center w-8 h-8 md:w-12 md:h-12   bg-[#305041] rounded-full -start-4 ring-4  ">
            <div> 3 </div>
          </span>
          <h3 className="font-medium leading-tight text-black ">Share your Link </h3>
          <p className="text-sm text-black ">After adding your photo to your gallery you can share to you love onece </p>
        </li>
      </ol>
    </div>
  );
}
