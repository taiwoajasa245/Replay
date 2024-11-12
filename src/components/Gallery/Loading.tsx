import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center  h-screen ">
      <div className="flex space-x-2 justify-center items-center">
        <div className="h-4 w-4 bg-black  rounded-full animate-bounce [animation-delay:-0.3s] "></div>
        <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s] "></div>
        <div className="h-4 w-4 bg-black rounded-full animate-bounce "></div>
      </div>
    </div>
  );
}
