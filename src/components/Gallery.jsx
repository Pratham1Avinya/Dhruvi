import { useState, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";
import { GALLERY } from "../config/constants";

export default function Gallery() {
  const [ref, visible] = useReveal();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % GALLERY.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const handleNext = () => {
    setIndex((i) => (i + 1) % GALLERY.length);
  };

  return (
    <section ref={ref} className="gallery-section">
      <p className={"section-eyebrow" + (visible ? " show" : "")}>A glimpse inside</p>
      <h2 className={"section-title" + (visible ? " show" : "")}>Our New Space</h2>
      <div className={"section-rule" + (visible ? " show" : "")} />

      <div
        className={"gallery-frame" + (visible ? " show" : "")}
        onClick={handleNext}
        title="Click to view next photo"
      >
        <div className="gallery-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {GALLERY.map((g, i) => (
            <div className="gallery-slide" key={i}>
              <img src={g.src} alt={`Pooja ceremony photo ${i + 1}`} className="gallery-portrait-img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
