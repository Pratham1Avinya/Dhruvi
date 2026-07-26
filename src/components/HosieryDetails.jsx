import { useReveal } from "../hooks/useReveal";

export default function HosieryDetails() {
  const [ref, visible] = useReveal();

  const categories = [
    {
      icon: "✨",
      title: "Women's Hosiery & Fashion",
      desc: "Premium Leggings, Jeggings, Seamless Stockings, Tights & Designer Shapewear.",
    },
    {
      icon: "🌸",
      title: "Comfort & Nightwear",
      desc: "Ultra-soft Cotton Essentials, Breathable Loungewear, Silk Satin Sets & Sleepwear.",
    },
    {
      icon: "👑",
      title: "Men & Kids Collection",
      desc: "High-grade Thermal Wear, Daily Comfort Socks, Sports Hosiery & Undergarments.",
    },
  ];

  const offers = [
    { tag: "SPECIAL OFFER", text: "Flat 20% Inaugural Discount on All Items during Opening Week!" },
    { tag: "EXPLICIT GIFT", text: "Complimentary Luxury Gift Voucher for the First 50 Guests!" },
    { tag: "GRAND DRAW", text: "Surprise Lucky Draw Coupons for All Inauguration Attendees!" },
  ];

  return (
    <section ref={ref} className="hosiery-details-section">
      <p className={"section-eyebrow" + (visible ? " show" : "")}>Exclusive Opening Highlights</p>
      <h2 className={"section-title" + (visible ? " show" : "")}>Our Collections &amp; Offers</h2>
      <div className={"section-rule" + (visible ? " show" : "")} />

      {/* Categories Grid */}
      <div className="hosiery-cat-grid">
        {categories.map((cat, i) => (
          <div
            className={"hosiery-cat-card" + (visible ? " show" : "")}
            style={{ transitionDelay: `${i * 0.12}s` }}
            key={i}
          >
            <span className="hosiery-cat-icon">{cat.icon}</span>
            <h3 className="hosiery-cat-title">{cat.title}</h3>
            <p className="hosiery-cat-desc">{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
