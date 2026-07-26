import { useEffect, useRef } from "react";

export default function Celebration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "#d4af37",
      "#f3e5ab",
      "#ff4136",
      "#2ecc40",
      "#ffdc00",
      "#ff851b",
      "#b10dc9",
      "#39ccd6",
      "#ff69b4",
      "#ffffff",
      "#e6ca65",
    ];

    const particles = [];
    const count = 130;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        w: 6 + Math.random() * 8,
        h: 14 + Math.random() * 18,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: 2.5 + Math.random() * 4,
        speedX: Math.sin(Math.random() * Math.PI * 2) * 1.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        oscillationSpeed: 0.02 + Math.random() * 0.03,
        oscillationStep: Math.random() * Math.PI * 2,
        isRibbon: Math.random() > 0.35,
      });
    }

    const startTime = Date.now();

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      // Fade out effect during the final 800ms of the 5-second duration
      let opacity = 1;
      if (elapsed > 4200) {
        opacity = Math.max(0, (5000 - elapsed) / 800);
      }
      ctx.globalAlpha = opacity;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.oscillationStep += p.oscillationSpeed;
        p.x += Math.sin(p.oscillationStep) * p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.isRibbon) {
          ctx.beginPath();
          ctx.roundRect
            ? ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 3)
            : ctx.rect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      if (elapsed < 5000) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fullscreen-celebration-canvas" />;
}
