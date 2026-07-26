import { useReveal } from "../hooks/useReveal";

export default function Highlights() {
  const [ref, visible] = useReveal();
  const items = [
    {
      icon: "✦",
      title: "100% Quality Fabric",
      body: "Curated from top domestic & international manufacturers ensuring supreme comfort and durability.",
    },
    {
      icon: "❀",
      title: "Opening Day Privileges",
      body: "Exclusive inaugural discounts, special giveaways, and complimentary gift hampers for early guests.",
    },
    {
      icon: "☆",
      title: "Wide Variety for All",
      body: "Comprehensive range of women's, men's, and kids' hosiery, daily essentials, and fashion wear.",
    },
    {
      icon: "⚜",
      title: "Personalized Shopping",
      body: "Spacious, air-conditioned boutique ambience with attentive customer service and trial comfort.",
    },
    {
      icon: "💎",
      title: "Genuine & Certified Brands",
      body: "Authentic, high-grade products directly sourced from leading national & global hosiery brands.",
    },
    {
      icon: "👑",
      title: "Festive & Bridal Specials",
      body: "Exclusive bridal legwear, festive silk sets, and elegant special-occasion gifting collections.",
    },
  ];

  return (
    <section ref={ref} className="highlights-section">
      <p className={"section-eyebrow" + (visible ? " show" : "")}>Why Visit Us</p>
      <h2 className={"section-title" + (visible ? " show" : "")}>Shop Highlights</h2>
      <div className={"section-rule" + (visible ? " show" : "")} />
      <div className="highlights-grid">
        {items.map((it, i) => (
          <div className={"highlight-card" + (visible ? " show" : "")} style={{ transitionDelay: `${i * 0.1}s` }} key={i}>
            <span className="highlight-icon">{it.icon}</span>
            <p className="highlight-title">{it.title}</p>
            <p className="highlight-body">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
