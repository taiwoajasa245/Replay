"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";


async function handleSignup(formData: FormData) {
  const dataObject = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObject),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Failed to create account. Please try again.";
      return { success: false, data: errorMessage };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Signup failed:", error);
    return {
      success: false,
      data: "Network error. Please check your connection and try again.",
    };
  }
}


export default function SignupForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);
    
      const formData = new FormData(e.currentTarget);
    
      const { success, data } = await handleSignup(formData);

      if (success) {
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: formData.get("email"),
          password: formData.get("password"),
        });
    
        if (signInResult?.error) {
          setError("Login error. Please check your credentials or try again later.");
        } else {
          setError("Signup successful!");
          router.push("/dashboard");
        }
      } else {
        setError(data || "Signup failed. Please ensure all fields are filled out correctly.");
      }
      setIsLoading(false);
    };
    

    

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className=" space-y-4 mx-1">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium">
              First Name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              required
              className="mt-1  rounded-xl  w-full px-3 py-2 border border-gray-300 text-black focus:outline-none  focus:border-[#305041] focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium ">
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              required
              className="mt-1  rounded-xl  w-full px-3 py-2 border border-gray-300 text-black focus:outline-none  focus:border-[#305041] focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium "
            >
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1  rounded-xl  w-full px-3 py-2 border border-gray-300 text-black focus:outline-none  focus:border-[#305041] focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1  rounded-xl  w-full px-3 py-2 border border-gray-300 text-black focus:outline-none  focus:border-[#305041] focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        {error && (
          <div
            className={`text-base mt-1 ml-2  ${
              error == "Signup successful!" ? "text-green-500" : "text-red-500"
            }`}
            role="alert"
          >
            {error}
          </div>
        )}

        <div>
          <div className="w-full flex justify-center ">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-14 py-2 rounded-md  md:px-32 text-[15px] text-white font-bold  tracking-widest cursor-pointer ${
                isLoading ? "bg-gray-400" : "bg-[#305041]"
              } `}
            >
              {isLoading ? "Loading..." : "Create Account"}
            </button>
          </div>
        </div>
      </form>
      <div className="w-full my-2 ">
        <div className=" flex justify-center tracking-widest ">
          <p> Already have an account?</p>
          <Link href="/login" className="text-[#305041] cursor-pointer ml-1 ">
            {" "}
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
