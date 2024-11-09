import Link from "next/link";

interface ReviewProps {
  text: string;
}

const Review: React.FC<ReviewProps> = ({
  text,
}) => {
  return (
    <div className="h- w-96  bg-[#305041] ">
        {text}
    </div>
  );
};

export default Review;
