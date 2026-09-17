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
      // Never start music while someone is filling in a form
      if (e.target.closest("input, textarea, select, [contenteditable]")) return;

      if (!hasInteracted.current && audioRef.current) {
        audioRef.current.volume = 0.1;
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
      ["mousedown", "touchstart"].forEach(ev => 
        document.removeEventListener(ev, handleFirstInteraction)
      );
    };

    // Keyboard users aren't opted in by pressing keys; they can use the toggle button
    ["mousedown", "touchstart"].forEach(ev => 
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
      audioRef.current.volume = 0.1;
      audioRef.current.play().catch(() => setIsPlaying(false));
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
        type="button"
        onClick={toggleSound}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isPlaying}
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