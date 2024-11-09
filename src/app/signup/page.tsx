import SignupForm from "@/components/auth/SignUpForm";
import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <div className="w-full">
      <div className="mx-5">
        <div>
          <p className="font-TAN_NIMBUS text-center my-10 text-[20px]">
            <Link href="/"> Replay. </Link>
          </p>
        </div>

        <div>
          <p className="font-semibold text-[20px]"> Get Started </p>
        </div>
        <div>
          <p className="font-medium text-sm">
            {" "}
            Welcome to Replay, Let's create your account!{" "}
          </p>
        </div>

        <hr className="my-10 mr-4" />

        <div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
