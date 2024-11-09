import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="w-full">
      <div className="mx-5">
        <div>
          <p className="font-TAN_NIMBUS text-center my-10 text-[20px]">
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
            Welcome back to replay, Let's go{" "}
          </p>
        </div>

        <hr className="my-10 mr-4" />

        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
