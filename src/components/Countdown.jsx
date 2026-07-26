import { useReveal } from "../hooks/useReveal";
import { useCountdown } from "../hooks/useCountdown";
import { EVENT_DATE_ISO } from "../config/constants";

export default function Countdown() {
  const [ref, visible] = useReveal();
  const left = useCountdown(EVENT_DATE_ISO);

  const box = (val, label) => (
    <div className="cd-box">
      <p className="cd-num">{String(val).padStart(2, "0")}</p>
      <p className="cd-lbl">{label}</p>
    </div>
  );

  return (
    <section ref={ref} className="countdown-section">
      <p className={"section-eyebrow" + (visible ? " show" : "")}>Mark your calendar</p>
      <h2 className={"section-title" + (visible ? " show" : "")}>Counting Down to Our Opening</h2>
      <div className={"section-rule" + (visible ? " show" : "")} />
      <div className={"cd-row" + (visible ? " show" : "")}>
        {left.done ? (
          <p className="cd-done">We are open — come celebrate with us!</p>
        ) : (
          <>
            {box(left.d, "Days")}
            {box(left.h, "Hours")}
            {box(left.m, "Minutes")}
            {box(left.s, "Seconds")}
          </>
        )}
      </div>
    </section>
  );
}
