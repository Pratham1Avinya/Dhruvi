import { useReveal } from "../hooks/useReveal";
import { useClock } from "../hooks/useClock";

export default function LiveClock() {
  const [ref, visible] = useReveal();
  const now = useClock();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <section ref={ref} className="clock-section">
      <div className={"clock-card" + (visible ? " show" : "")}>
        <p className="clock-label">Right now</p>
        <p className="clock-time">{time}</p>
        <p className="clock-date">{date}</p>
      </div>
    </section>
  );
}
