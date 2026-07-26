import { useReveal } from "../hooks/useReveal";
import { VENUE_NAME, VENUE_ADDRESS, MAPS_QUERY } from "../config/constants";

export default function Venue() {
  const [ref, visible] = useReveal();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section ref={ref} className="venue-section">
      <p className={"section-eyebrow" + (visible ? " show" : "")}>Where to find us</p>
      <h2 className={"section-title" + (visible ? " show" : "")}>Store Location</h2>
      <div className={"section-rule" + (visible ? " show" : "")} />

      <div className={"venue-split-container" + (visible ? " show" : "")}>
        {/* Left Side: Map */}
        <div className="venue-map-wrapper">
          <iframe
            title="Dhruvi Fashion & Hosiery Location Map"
            src={embedMapUrl}
            className="venue-map-iframe"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Right Side: Address & Details */}
        <div className="venue-details-card">
          <span className="venue-badge">✦ GRAND OPENING VENUE ✦</span>
          <h3 className="venue-name">{VENUE_NAME}</h3>

          <div className="venue-address-block">
            <span className="venue-icon">📍</span>
            <p className="venue-address">{VENUE_ADDRESS}</p>
          </div>

          <div className="venue-landmarks">
            <p className="landmark-title">Location Guidance:</p>
            <ul className="landmark-list">
              <li>🏢 <strong>1st Floor</strong>, Above Shaswat Clinic</li>
              <li>🛕 Near <strong>Bapa Sitaram Chowk</strong></li>
              <li>📍 Kamrej, Surat, Gujarat</li>
            </ul>
          </div>

          <a
            className="venue-btn"
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            🗺️ Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
