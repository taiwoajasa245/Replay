// import Image from "next/image";
import InfoCard from "./InfoCard";

export default function BFFSection() {
  return (
    <section className="w-full">
      <div>
        <p className="text-center  text-[17px] md:text-[35px] tracking-[1.5px] font-extrabold ">
          Why Replay is Your New BFF
        </p>
      </div>

      <div className="md:flex mt-16">
        <InfoCard
          icon="/upload-icon.svg"
          title="Unlimited"
          title2="uploads"
          description="Enjoy access to unlimited file uploads"
        />

        <div className="my-8 md:my-0">
          <InfoCard
            icon="/cyber-security-icon.svg"
            title="Secure"
            title2="uploads"
            description="Enjoy access to a safe file upload "
          />
        </div>
        <InfoCard
          icon="/wow-icon.svg"
          title="Simple"
          title2="Interface"
          description="Enjoy access to a very simple interface"
        />
      </div>
    </section>
  );
}
