"use client";

import { useState, useEffect, useRef } from "react";
import AudioWave from "../components/AudioWave";

export function Sound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const handleFirstInteraction = (e) => {
      // If clicking the button itself, don't trigger the global 'first play'
      if (e.target.closest(".sound-btn")) return;

      if (!hasInteracted.current && audioRef.current) {
        audioRef.current.volume = 0.2;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
            removeListeners();
          })
          .catch(() => {});
      }
    };

    const removeListeners = () => {
      ["mousedown", "keydown", "touchstart"].forEach(ev => 
        document.removeEventListener(ev, handleFirstInteraction)
      );
    };

    ["mousedown", "keydown", "touchstart"].forEach(ev => 
      document.addEventListener(ev, handleFirstInteraction)
    );

    return removeListeners;
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation(); // Stops the global listener from fighting with this button
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.2;
      audioRef.current.play();
      setIsPlaying(true);
      hasInteracted.current = true;
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/sound/birth-of-new-galaxy.mp3" 
        loop 
      />
      
      <button
        onClick={toggleSound}
        className="sound-btn fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl group"
      >
        <AudioWave isPlaying={isPlaying} />
        
        {/* <div className="flex flex-col items-start leading-none pr-1">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-40">Audio</span>
          <span className="text-[11px] font-bold tracking-widest uppercase group-hover:text-green-400 transition-colors">
            {isPlaying ? "On" : "Off"}
          </span>
        </div> */}
      </button>
    </>
  );
}