import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { SHOP_NAME, WHATSAPP_NUMBER } from "../config/constants";

export default function MessageForm() {
  const [ref, visible] = useReveal();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("Yes, I'll be there");
  const [message, setMessage] = useState("");

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const text =
      `Hello! I'd like to RSVP for the Grand Opening of ${SHOP_NAME}.\n` +
      `Name: ${name || "-"}\n` +
      `Attending: ${attending}\n` +
      `Message: ${message || "-"}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={ref} className="form-section">
      <p className={"section-eyebrow light" + (visible ? " show" : "")}>RSVP</p>
      <h2 className={"section-title light" + (visible ? " show" : "")}>Send a Message</h2>
      <div className={"section-rule light" + (visible ? " show" : "")} />

      <form className={"rsvp-form" + (visible ? " show" : "")} onSubmit={sendToWhatsApp}>
        <label className="form-label">Your Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label">Will you be attending?</label>
        <select className="form-input" value={attending} onChange={(e) => setAttending(e.target.value)}>
          <option>Yes, I'll be there</option>
          <option>I'll try my best</option>
          <option>Sorry, can't make it</option>
        </select>

        <label className="form-label">Your Message</label>
        <textarea
          className="form-input form-textarea"
          placeholder="Write your wishes..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="form-submit" type="submit">
          Send via WhatsApp
        </button>
      </form>
    </section>
  );
}
