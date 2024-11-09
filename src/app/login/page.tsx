import LoginForm from "@/components/auth/LoginForm";
import Review from "@/components/common/Reviews";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div>
      <div className="w-full md:flex md:justify-evenly  ">
        <div className="mx-5 ">
          <div>
            <p className="font-TAN_NIMBUS text-center my-10 text-[20px] md:text-start ">
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
          <hr className="my-10 mr-4" />
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden md:flex">
        <Review
          author=" - Sarah & Jake "
          text="“Using Replay for our wedding was a game-changer! We got to see our day from every angle—candid shots, funny moments, and memories we would’ve missed. Friends and family loved how easy it was to upload their photos, and now we have a full album of memories that perfectly capture the magic of our day.”"
        />
      </div>
    </div>
  );
}
