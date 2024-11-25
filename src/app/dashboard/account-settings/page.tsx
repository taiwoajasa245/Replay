import AccoutSettingsComponent from "@/components/Gallery/AccountSettings/AccountSettingsComponent";
import Loading from "@/components/Gallery/Loading";
import { fetchUserDetails } from "@/utils/GalleryAction";
import { revalidatePath } from "next/cache";
import React, { Suspense } from "react";

type User = {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
};

// Server component to fetch user details
async function AccountDetailsFetcher() {
  let accountDetails: User = {
    photo: "",
    firstName: "",
    lastName: "",
    email: ""
  };
  let errorMessage = "";

  try {
    const result = await fetchUserDetails();
    if (!result || !(result as { data: unknown }).data) {
      throw new Error("Failed to load user details");
    }
    accountDetails = result.data as User ;
  } catch (error) {
    console.error("Error fetching user details:", error);
    errorMessage =
      "Sorry, we couldn't load your account details at this time. Check your internet and try again.";
  }

  const revalidateAccountDetails = async () => {
    "use server";
    revalidatePath("/account-settings");
  };

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">{errorMessage}</p>
      </div>
    );
  }

  if(accountDetails.firstName === ""){ 
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">
        We couldn't retrieve your account details at the moment. Please try refreshing the page or check back later.
        </p>
      </div>
    );
  }

  return (
    <AccoutSettingsComponent
      user={accountDetails}
      onRevalidate={revalidateAccountDetails}
    />
  );
}

export default function AccountSettingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AccountDetailsFetcher />
    </Suspense>
  );
}
