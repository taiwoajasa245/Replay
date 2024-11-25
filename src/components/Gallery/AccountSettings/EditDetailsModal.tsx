import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

type EditDetailsProps = {
  photo: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRevalidate: () => void;
};

export default function EditDetailsModal({
  photo,
  setIsModalOpen,
  onRevalidate,
}: EditDetailsProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState(photo);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedPhoto(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {



      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("photo", uploadedPhoto);

      const response = await fetch("/api/user/details", {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to save details");
      }

      await onRevalidate();
      toast.success("Details updated successfully!");
      setIsModalOpen(false);
    } catch (err: any) {
      // setError(err.message || "Something went wrong!");
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white px-5 py-5 pb-7 md:p-10 rounded-lg w-[18rem] md:w-[27rem]">
          {/* cancel button  */}

          <div className="flex justify-end items-end">
            <button
              onClick={handleCloseModal}
              className="mb-6 hover:bg-slate-100 p-2 rounded"
            >
              <Image
                src="/cancel-button.svg"
                alt="upload to cloud icon"
                width={100}
                height={100}
                className="w-4 cursor-pointer"
              />
            </button>
          </div>

          <form onSubmit={handleSubmit} className=" space-y-5">
            <div className="mb-4 relative ">
              <div className="flex justify-center items-center">
                <Image
                  src={uploadedPhoto}
                  alt="profile image"
                  width={150}
                  height={150}
                  className="rounded-full w-28 h-28"
                />
              </div>

              <div className="absolute bottom-0 right-20 md:right-32  bg-white rounded-full p-1">
                <input
                  type="file"
                  accept="image/*"
                  id="upload-photo"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label htmlFor="upload-photo">
                  <Image
                    src="/edit-icon.svg"
                    alt="Edit Image"
                    width={150}
                    height={150}
                    className="w-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            <div className=" space-y-4 ">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-semibold tracking-widest "
                >
                  First Name:
                </label>
                <input
                  id="firstName "
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  className="mt-1  rounded-xl  w-full px-3 py-2 border border-gray-300 text-black focus:outline-none  focus:border-[#305041] focus:z-10 "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block  font-semibold tracking-widest "
                >
                  Last Name:
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  className="mt-1  rounded-xl  w-full px-3 py-2 border border-gray-300 text-black focus:outline-none  focus:border-[#305041] focus:z-10 sm:text-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="email-address"
                  className="block font-semibold tracking-widest "
                >
                  Email:
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
            </div>

            <div>
              <div className="w-full flex justify-center  ">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-14 py-2 md:px-32 rounded-md text-[15px]  font-bold tracking-widest text-white cursor-pointer ${
                    isLoading ? "bg-gray-400 flex items-center" : "bg-[#305041]"
                  }`}
                >
                  {isLoading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
