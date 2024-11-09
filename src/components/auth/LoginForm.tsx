"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("All fields are required");
      setIsLoading(true);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        setError("Login successful!");
        router.push("/dashboard");
      } else {
        setError("An unexpected error occurred");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      setError(
        errorMessage ||
          "An error occurred during login, please check your internet and try again."
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
            className={`text-sm mt-2 ${
              error.includes("Login successful")
                ? "text-green-500"
                : "text-red-500"
            }`}
            role="alert"
          >
            {error}
          </div>
        )}

        <div>
          <div className="w-full flex justify-center  ">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-14 py-2 md:px-32 rounded-md text-[15px]  font-bold tracking-widest text-white cursor-pointer ${
                isLoading ? "bg-gray-400" : "bg-[#305041]"
              }`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </form>
      <div className="w-full mt-2 ">
        <div className=" flex justify-center tracking-wide">
          <p> Don&apos;t have an account?</p>
          <Link href="/signup" className="text-[#305041] cursor-pointer ml-1 ">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
