import { useState, useEffect } from "react";

export default function RightScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`right-side-scroll-guide ${visible ? "show" : "hide"}`}>
      <div className="right-scroll-golden-bar">
        <span className="right-scroll-text">SCROLL</span>
        <span className="right-scroll-arrow">v</span>
      </div>
    </div>
  );
}
