import { useState } from "react";
import GoldHand3D from "./GoldHand3D";

export default function Cover({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleTap = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1300);
  };

  return (
    <div className="cover-stage">
      <div className={"curtain curtain-left" + (opening ? " open" : "")} />
      <div className={"curtain curtain-right" + (opening ? " open" : "")} />
      <div className={"cover-content" + (opening ? " fade" : "")}>
        <div className="cover-center-wrapper">
          <button className="cover-btn" onClick={handleTap} aria-label="Tap logo to open invitation">
            <div className="cover-logo-container">
              <span className="cover-btn-ring" />
              <span className="cover-btn-pulse" />
              <img src="/logo.png" alt="Dhruvi Fashion & Hosiery Logo" className="cover-shop-logo" />

              {/* 3D Golden Hand Tapping Animation */}
              <div className="cover-3d-gold-hand-tap">
                <GoldHand3D className="tapping-hand-3d" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
