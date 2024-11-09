import React from 'react';

interface MarqueeProps {
  text: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee text-[15px] tracking-[2px] md:text-[20px]">
        {text}  
      </div>
    </div>
  );
};

export default Marquee;
