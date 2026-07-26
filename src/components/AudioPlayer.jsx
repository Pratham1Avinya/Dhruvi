import { useState, useEffect, useRef } from "react";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const lastToggleTimeRef = useRef(0);

  // Exclusively play miromaxmusic-music-promotion-no-copyright-513944.mp3
  const musicTrackUrl = "/miromaxmusic-music-promotion-no-copyright-513944.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    // Attempt default playback on mount
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    // Instant unlock on first touch/tap on window for autoplay policy compliance
    const handleInitialTap = () => {
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => {
            setPlaying(true);
            window.removeEventListener("pointerdown", handleInitialTap);
            window.removeEventListener("touchstart", handleInitialTap);
            window.removeEventListener("click", handleInitialTap);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("pointerdown", handleInitialTap);
    window.addEventListener("touchstart", handleInitialTap);
    window.addEventListener("click", handleInitialTap);

    return () => {
      window.removeEventListener("pointerdown", handleInitialTap);
      window.removeEventListener("touchstart", handleInitialTap);
      window.removeEventListener("click", handleInitialTap);
    };
  }, []);

  // Single instant tap toggle handler
  const handleToggle = (e) => {
    if (e) {
      e.stopPropagation();
    }
    const now = Date.now();
    // Debounce 250ms to prevent double-firing from both touchstart & click events
    if (now - lastToggleTimeRef.current < 250) return;
    lastToggleTimeRef.current = now;

    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      // 1-Tap: Stop Music
      audio.pause();
      setPlaying(false);
    } else {
      // 1-Tap: Instantly Play/Resume Music
      audio.volume = 0.55;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      } else {
        setPlaying(true);
      }
    }
  };

  return (
    <div className="audio-control-fixed">
      <audio ref={audioRef} src={musicTrackUrl} loop preload="auto" />
      <button
        className={`audio-btn ${playing ? "playing" : "muted"}`}
        onPointerDown={handleToggle}
        onClick={handleToggle}
        aria-label={playing ? "Stop Music" : "Re-play Music"}
        title={playing ? "Click to Stop Music" : "Click to Re-play Music"}
      >
        <span className="audio-icon">{playing ? "🔊" : "🔇"}</span>
        <span className="audio-label">{playing ? "MUSIC ON" : "MUSIC OFF"}</span>
      </button>
    </div>
  );
}
