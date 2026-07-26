import { SHOP_NAME, OWNER, OWNER_SPOUSE } from "../config/constants";

export default function Footer() {
  return (
    <footer className="invite-footer">
      <p className="footer-shop">{SHOP_NAME}</p>
      <p className="footer-owners">{OWNER} &amp; {OWNER_SPOUSE}</p>
      <p className="footer-note">With warmth, and a new beginning</p>
      <div className="footer-credit-badge">
        <span>Created &amp; Designed by <strong>Pratham Antala</strong></span>
      </div>
    </footer>
  );
}
