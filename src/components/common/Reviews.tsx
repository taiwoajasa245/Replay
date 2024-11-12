

interface ReviewProps {
  text: string;
  author: string;
}

const Review: React.FC<ReviewProps> = ({ text, author }) => {
  return (
    <div className="w-full h-full rounded-xl flex flex-col justify-center items-center bg-[#305041] text-white p-4">
      <div className="w-full max-w-2xl text-center px-4 py-6 bg-[#305041] rounded-lg shadow-lg animate-flip-down animate-delay-100 animate-normal">
        <p>{text}</p>
      </div>
      <div className="mt-4 text-sm text-gray-300 animate-fade-up animate-normal">{author}</div>
    </div>
  );
};

export default Review;
