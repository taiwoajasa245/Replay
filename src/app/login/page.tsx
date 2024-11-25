import LoginForm from "@/components/auth/LoginForm";
import Review from "@/components/common/Reviews";
import Link from "next/link";
import React from "react";

export default async function Login() {
 
  return (
    <div className="w-full flex h-screen justify-evenly animate-fade animate-normal">
      <div className="w-full">
        <div className="mx-5 md:h-full md:flex md:flex-col md:justify-center md:mx-52">
          <div>
            <p className="font-TAN_NIMBUS text-center my-10 text-[20px] md:text-[25px] md:text-start ">
              <Link href="/">Replay.</Link>
            </p>
          </div>

          <div>
            <p className="font-bold text-[20px] tracking-wider ">
              {" "}
              Welcome Back{" "}
            </p>
          </div>
          <div>
            <p className="font-medium text-sm tracking-wide">
              Welcome back to replay, Let&apos;s go{" "}
            </p>
          </div>
          <hr className="my-10 mr-4 "  />
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden md:flex m-3">
        <Review
          author=" - Sarah & Jake "
          text="“Using Replay for our wedding was a game-changer! We got to see our day from every angle—candid shots, funny moments, and memories we would’ve missed. Friends and family loved how easy it was to upload their photos, and now we have a full album of memories that perfectly capture the magic of our day.”"
        />
      </div>
    </div>
  );
}
