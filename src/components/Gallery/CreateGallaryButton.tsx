import Link from "next/link";

interface CreateGalleryButtonProps {
  text: string;
  onClose: () => void;
}

const CreateGalleryButton: React.FC<CreateGalleryButtonProps> = ({
  text,
  onClose,
}) => {
  return (
    <div>

      {/* desktop screen  */}
      <div className="hidden md:flex">
        <button  className="w-full flex justify-center">
          <Link
            href="/dashboard/create/gallery"
            className="px-12 py-2 md:px-10 md:py-2 rounded-[20px] text-[15px] md:text-[20px] text-white bg-[#305041] cursor-pointer transition duration-300 hover:bg-[#426d57]"
          >
            {text}
          </Link>
        </button>
      </div>

      {/* mobile screen */}
      <div className="md:hidden">
        <button onClick={onClose} className="w-full flex justify-center">
          <Link
            href="/dashboard/create/gallery"
            className="px-12 py-2 md:px-10 md:py-2 rounded-[20px] text-[15px] md:text-[20px] text-white bg-[#305041] cursor-pointer transition duration-300 hover:bg-[#426d57]"
          >
            {text}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CreateGalleryButton;
