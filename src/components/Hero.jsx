import { useReveal } from "../hooks/useReveal";
import { SHOP_NAME, OWNER, OWNER_SPOUSE } from "../config/constants";

export default function Hero() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="hero-section">
      <p className={"hero-eyebrow" + (visible ? " show d1" : "")}>
        You are warmly invited to the Grand Opening of
      </p>
      <h1 className={"hero-shopname" + (visible ? " show d2" : "")}>{SHOP_NAME}</h1>
      <div className={"hero-rule" + (visible ? " show d3" : "")} />
      <p className={"hero-owners" + (visible ? " show d4" : "")}>
        Founded &amp; presented by
      </p>
      <p className={"hero-ownernames" + (visible ? " show d5" : "")}>
        {OWNER} <span className="amp">&amp;</span> {OWNER_SPOUSE}
      </p>
      <p className={"hero-line" + (visible ? " show d6" : "")}>
        Step in and be among the very first to explore our new home for fashion &amp; hosiery.
      </p>
    </section>
  );
}
