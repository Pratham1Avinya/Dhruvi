import { useState, useEffect, useRef, useCallback } from "react";
import { useReveal } from "../hooks/useReveal";
import { EVENT_DAY, EVENT_DATE_LABEL, EVENT_TIME_LABEL } from "../config/constants";
import GoldHand3D from "./GoldHand3D";

export default function ScratchCard({ onReveal }) {
  const [ref, visible] = useReveal();
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [userScratched, setUserScratched] = useState(false);

  const drawGold = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#e7c27a");
    grad.addColorStop(0.5, "#c9992f");
    grad.addColorStop(1, "#a6791f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(18, 16, 14, 0.9)";
    ctx.font = "600 20px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ Scratch to Reveal ✦", w / 2, h / 2);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    drawGold();
  }, [visible, drawGold]);

  const triggerCelebration = () => {
    setRevealed(true);
    if (onReveal) onReveal();

    // Auto-scroll smoothly to the next section after revelation
    setTimeout(() => {
      document.querySelector(".hosiery-details-section")?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  const scratchAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkCleared = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    const step = 40;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      sampled++;
      if (data[i] === 0) cleared++;
    }
    if (sampled > 0 && cleared / sampled > 0.4) {
      triggerCelebration();
    }
  };

  const toXY = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  };

  const onDown = (e) => {
    drawing.current = true;
    setUserScratched(true);
    const { x, y } = toXY(e);
    scratchAt(x, y);
  };

  const onMove = (e) => {
    if (!drawing.current) return;
    setUserScratched(true);
    const { x, y } = toXY(e);
    scratchAt(x, y);
  };

  const onUp = () => {
    if (drawing.current) checkCleared();
    drawing.current = false;
  };

  return (
    <section ref={ref} className="scratch-section">
      <p className={"section-eyebrow" + (visible ? " show" : "")}>The details</p>
      <h2 className={"section-title" + (visible ? " show" : "")}>Scratch to Reveal</h2>
      <div className={"section-rule" + (visible ? " show" : "")} />

      <div className={"scratch-wrap" + (visible ? " show" : "")}>
        <div className="scratch-under">
          <p className="scratch-headline">You're Invited!</p>
          <p className="scratch-day">{EVENT_DAY}</p>
          <p className="scratch-date">{EVENT_DATE_LABEL}</p>
          <p className="scratch-time">{EVENT_TIME_LABEL} onwards</p>
        </div>

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
          />
        )}

        {/* Animated 3D Golden Hand Scrubbing Left to Right */}
        {!revealed && !userScratched && (
          <div className="scratch-3d-hand-scrub">
            <GoldHand3D className="scrubbing-hand-3d" />
          </div>
        )}
      </div>

      {!revealed && (
        <p className="scratch-hint pulse">
          👈 Drag or Scrub your finger left to right across the card 👉
        </p>
      )}
    </section>
  );
}
