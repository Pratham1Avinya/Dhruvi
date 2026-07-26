import { useReveal } from "../hooks/useReveal";
import { OWNER, OWNER_SPOUSE } from "../config/constants";

export default function Timeline() {
  const [ref, visible] = useReveal();
  const items = [
    {
      t: "9:00 AM",
      title: "Guest Arrival & Welcome Refreshments",
      body: "Gathering of friends, family & esteemed guests with hot tea, coffee & morning delicacies.",
    },
    {
      t: "9:30 AM",
      title: "Auspicious Puja & Ribbon Cutting",
      body: `${OWNER} & ${OWNER_SPOUSE} perform the inaugural puja and cut the ribbon to officially open the doors.`,
    },
    {
      t: "10:00 AM",
      title: "Exclusive Store Walkthrough & Collection Launch",
      body: "Be the very first to explore our wide range of premium hosiery, innerwear, and festive fashionwear.",
    },
    {
      t: "10:30 AM onwards",
      title: "Inaugural Shopping & Lucky Draw Registration",
      body: "Enjoy opening-day special discounts, complimentary gift hampers, and enter our inauguration lucky draw!",
    },
  ];

  return (
    <section ref={ref} className="timeline-section">
      <p className={"section-eyebrow" + (visible ? " show" : "")}>The Celebration Schedule</p>
      <h2 className={"section-title" + (visible ? " show" : "")}>Grand Inauguration Timeline</h2>
      <div className={"section-rule" + (visible ? " show" : "")} />
      <div className="timeline-list">
        {items.map((it, i) => (
          <div className={"timeline-item" + (visible ? " show" : "")} style={{ transitionDelay: `${i * 0.12}s` }} key={i}>
            <span className="timeline-dot" />
            <div>
              <p className="timeline-title">{it.title}</p>
              <p className="timeline-time">{it.t}</p>
              <p className="timeline-body">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
