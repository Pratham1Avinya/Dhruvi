import { useState } from "react";
import Cover from "./components/Cover";
import Hero from "./components/Hero";
import ScratchCard from "./components/ScratchCard";
import HosieryDetails from "./components/HosieryDetails";
import Gallery from "./components/Gallery";
import Countdown from "./components/Countdown";
import Timeline from "./components/Timeline";
import Venue from "./components/Venue";
import Highlights from "./components/Highlights";
import MessageForm from "./components/MessageForm";
import Footer from "./components/Footer";
import Celebration from "./components/Celebration";
import RightScrollIndicator from "./components/RightScrollIndicator";
import AudioPlayer from "./components/AudioPlayer";
import "./App.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const handleReveal = () => {
    setCelebrating(true);
    setTimeout(() => {
      setCelebrating(false);
    }, 5000); // 5 second celebration timer
  };

  return (
    <div className="invite-root">
      {/* Background Music auto-plays by default */}
      <AudioPlayer autoPlay={true} />

      {celebrating && <Celebration />}
      {!opened && <Cover onOpen={() => setOpened(true)} />}
      {opened && (
        <>
          <RightScrollIndicator />
          <main className="invite-main">
            <Hero />
            <ScratchCard onReveal={handleReveal} />
            <HosieryDetails />
            <Gallery />
            <Countdown />
            <Timeline />
            <Venue />
            <Highlights />
            <MessageForm />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}
