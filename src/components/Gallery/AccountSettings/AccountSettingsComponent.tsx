"use client";

import Loading from "@/components/Gallery/Loading";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import EditDetailsModal from "./EditDetailsModal";
import ChangePasswordModal from "./ChangePasswordModal";

type User = {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
};

type UserResponseProps = {
  user: User;
  onRevalidate: () => void;
};

export default function AccoutSettingsComponent({
  user,
  onRevalidate,
}: UserResponseProps) {
  const { data: session, status } = useSession();
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return (
      <div className="bg-black text-white h-screen w-full">Access Denied</div>
    );
  }

  return (
    <div className="flex flex-col p-9">
      <div className="flex md:flex-row flex-col  gap-4">
        {/* Profile Picture */}
        <div className="relative mb-4 md:block flex justify-center ">
          <Image
            src={user.photo}
            alt="profile image"
            width={150}
            height={150}
            className="rounded-full w-28 md:w-36"
          />
        </div>

        <div>
          {/* Profile Name and Email */}
          <div className=" my-5 text-center md:text-left">
            <p className="text-3xl  font-semibold text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-lg text-black font-medium ">{user?.email}</p>
          </div>

          {/* Edit Profile Button */}
          <div className="my-6 md:block flex justify-center">
            <button
              onClick={() => setIsEditDetailsModalOpen(true)}
              className="px-12 py-2 md:px-10 md:py-1 rounded-[12px] text-[17px] md:text-[22px] text-white bg-[#305041] transition duration-300 hover:bg-[#426d57]"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Button */}
      <div className="mt-20 mb-6 w-full">
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="text-2xl font-medium"
        >
          Change Password
        </button>
      </div>

      {/* Logout Button */}
      <div className="">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className=" text-red-500 text-2xl "
        >
          Logout
        </button>
      </div>

      {isEditDetailsModalOpen && (
        <EditDetailsModal
          photo={user.photo}
          setIsModalOpen={() => setIsEditDetailsModalOpen(false)}
          onRevalidate={onRevalidate}
        />
      )}

      {isPasswordModalOpen && (
        <ChangePasswordModal
          setIsModalOpen={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
}
