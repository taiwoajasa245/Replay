

interface ReviewProps {
  text: string;
  author: string;
}

const Review: React.FC<ReviewProps> = ({ text, author }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#305041] text-white p-4">
      <div className="w-full max-w-md text-center px-4 py-6 bg-[#305041] rounded-lg shadow-lg">
        <p>{text}</p>
      </div>
      <div className="mt-4 text-sm text-gray-300">{author}</div>
    </div>
  );
};

export default Review;
