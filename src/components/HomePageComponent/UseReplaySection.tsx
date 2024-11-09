import Image from "next/image";
import GetStartedButton from "../common/GetStartedButton";

export default function UseReplaySection() {
  return (
    <section>
      <div className="md:my-16">
        <p className="text-center md:text-[30px]  text-[17px] tracking-[1.5px] font-extrabold ">
          Use replay, stop limiting your view
        </p>
      </div>

      <div className="md:flex items-center ">
        <div className="my-9 md:my-0  w-full flex justify-center">
          <Image
            aria-hidden
            src="./section-image.svg"
            alt="menu bar"
            width={250}
            height={250}
            className="md:w-[400px]"
          />
        </div>

        <div>
          <div>
            <p className="text-center mx-5 md:text-[30px]">
              With Replay, you’ll never miss a moment. Unlike other apps, Replay
              lets your friends and family add photos directly to your private
              gallery, capturing every angle and memory without the hassle.
            </p>
          </div>
          <div className="mt-4">
            <GetStartedButton text="Get started" />
          </div>
        </div>
      </div>
    </section>
  );
}
