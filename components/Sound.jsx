"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function Sound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleCanPlay = () => {
      console.log("Audio is ready, waiting for user interaction...");
    };

    const startAudio = () => {
      if (audio && !hasInteracted) {
        setHasInteracted(true);
        audio.volume = 0.5;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Audio started successfully!");
          })
          .catch((error) => {
            console.log("Play failed:", error);
          });
      }
    };

    if (audio) {
      audio.addEventListener('canplay', handleCanPlay);
      
      // Listen for ANY user interaction
      const interactions = [
        'click', 'keydown', 'touchstart', 'mousedown', 
        'scroll', 'mousemove', 'wheel', 'pointerdown'
      ];
      
      interactions.forEach(event => {
        document.addEventListener(event, startAudio, { once: true });
      });

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        interactions.forEach(event => {
          document.removeEventListener(event, startAudio);
        });
      };
    }
  }, [hasInteracted]);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.volume = 0.5;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((error) => {
            console.log("Play failed:", error);
          });
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/sound/birth-of-new-galaxy.mp3" 
        loop 
        preload="auto"
        playsInline
        muted={false}
      />
      
      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="fixed bottom-6 right-6 z-50 p-3 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 shadow-lg group"
        aria-label={isPlaying ? "Mute sound" : "Unmute sound"}
      >
        {isPlaying ? (
          <Volume2 
            size={20} 
            className="group-hover:text-pink-400 transition-colors duration-300" 
          />
        ) : (
          <VolumeX 
            size={20} 
            className="group-hover:text-pink-400 transition-colors duration-300" 
          />
        )}
        
        {/* Show prompt when not playing */}
        {!isPlaying && !hasInteracted && (
          <span className="absolute -top-12 right-0 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Click anywhere to enable sound
          </span>
        )}
        
        {/* Pulse animation when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-pink-400/30 animate-ping" />
        )}
      </button>
    </>
  );
}