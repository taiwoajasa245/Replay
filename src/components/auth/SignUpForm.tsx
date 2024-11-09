"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    // Prepare JSON data
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError(result.error);
        } else if (result?.ok) {
          setError("Signup successful");
          router.push("/dashboard");
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        setError(
          "An error occurred during signup, check your internet and try again "
        );
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      setError(
        errorMessage ||
          "An error occurred during signup, please check your internet and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className=" space-y-6" onSubmit={handleSubmit}>
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div
            className={`text-base mt-2 font-bold ${
              error.includes("Signup successful")
                ? "text-green-500"
                : "text-red-500"
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
