import Link from "next/link";

interface GetStartedButtonProps {
  text: string;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({
  text,
}) => {
  return (
    <div className="w-full flex justify-center">
      <Link
        href="/signup"
        className="px-8 py-2 md:px-10 md:py-3 rounded-[20px] text-[15px] md:text-[20px] text-white bg-[#305041] cursor-pointer transition duration-300 hover:bg-[#426d57]"
      >
        {text}
      </Link>
    </div>
  );
};

export default GetStartedButton;
