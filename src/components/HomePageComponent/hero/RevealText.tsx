import { useEffect, useRef, useState } from 'react';

function HeroSection() {
  const [isAnimated, setIsAnimated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const textElements = textRef.current.querySelectorAll('span');
      textElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate-text-reveal');
        }, index * 100); // Adjust the delay as needed
      });
      setIsAnimated(true);
    }
  }, [textRef]);

  return (
    <div className="hero-section">
      <h1 ref={textRef}>
        <span>Capture</span>
        <span>and</span>
        <span>Share</span>
        <span>Your</span>
        <span>Special</span>
        <span>Moments,</span>
        <span>Privately</span>
      </h1>
    </div>
  );
}