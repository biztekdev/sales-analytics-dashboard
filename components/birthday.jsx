
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"

export default function BirthdayPremium({ isVisible, name = "Friend" }) {
  const [phase, setPhase] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [audioRef, setAudioRef] = useState(null);
  const [clapRef, setClapRef] = useState(null);
  const [interactionHooked, setInteractionHooked] = useState(false);
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
      if (clapRef) {
        clapRef.pause();
        clapRef.currentTime = 0;
      }
    };
  }, [audioRef, clapRef]);
  
  useEffect(() => {
    if (!isVisible) {
      setPhase(0)
      setShowConfetti(false)
      setInteractionHooked(false)
      return
    }

    // Start playing birthday music once when visible
    if (audioRef) {
      audioRef.currentTime = 0;
      audioRef.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }

    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setShowConfetti(true), 2200),
    ]

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [isVisible, audioRef])

  // Fallback: if autoplay is blocked, play on first user interaction
  useEffect(() => {
    if (!isVisible || !audioRef || interactionHooked) return;

    const handleInteraction = () => {
      audioRef.currentTime = 0;
      audioRef.play().catch(() => {});
      setInteractionHooked(true);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("pointerdown", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [isVisible, audioRef, interactionHooked]);

  // Play clap sound when confetti shows
  useEffect(() => {
    if (showConfetti && clapRef) {
      clapRef.currentTime = 0;
      clapRef.play().catch((error) => {
        console.log("Clap play failed:", error);
      });
    }
  }, [showConfetti, clapRef]);

  if (!isVisible || !isClient) return null

  // Format name(s) for display
  let displayName = "";
  if (Array.isArray(name)) {
    if (name.length === 1) {
      displayName = name[0];
    } else if (name.length === 2) {
      displayName = `${name[0]} & ${name[1]}`;
    } else if (name.length > 2) {
      displayName = name.slice(0, -1).join(", ") + ` & ${name[name.length - 1]}`;
    } else {
      displayName = "Friend";
    }
  } else {
    displayName = name || "Friend";
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const floatVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Light Off-White Background */}
      
      {/* Birthday Music */}
      <audio
        ref={setAudioRef}
        preload="auto"
        autoPlay
        playsInline
      >
        <source src="/audio/birthday.mp3" type="audio/mpeg" />
        <source src="/audio/birthday.ogg" type="audio/ogg" />
      </audio>

      {/* Clap Sound */}
      <audio ref={setClapRef} preload="auto" volume={1}>
        <source src="/audio/clap.mp3" type="audio/mpeg" />
        <source src="/audio/clap.ogg" type="audio/ogg" />
      </audio>
      
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #ECD1A3 0%, #f5e6d3 50%, #ECD1A3 100%)" }}>
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 xl-plus:w-[700px] xl-plus:h-[700px] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 xl-plus:w-[700px] xl-plus:h-[700px] w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 xl-plus:w-[700px] xl-plus:h-[700px]  w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 xl-plus:w-[700px] xl-plus:h-[700px] w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Left Sports Light - Red */}
        <motion.div
          className="absolute -left-20 top-1/4 z-5 pointer-events-none"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div 
            className="w-40 h-40 xl-plus:w-96 xl-plus:h-96 rounded-full blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(239, 68, 68, 0.9), rgba(239, 68, 68, 0.4), transparent)",
              boxShadow: "0 0 80px rgba(239, 68, 68, 0.7), inset 0 0 60px rgba(239, 68, 68, 0.5)",
            }}
          />
        </motion.div>

        {/* Right Sports Light - Blue */}
        <motion.div
          className="absolute -right-20 bottom-1/4 z-5 pointer-events-none"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
        >
          <div 
            className="w-40 h-40 xl-plus:w-96 xl-plus:h-96 rounded-full blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.4), transparent)",
              boxShadow: "0 0 80px rgba(59, 130, 246, 0.7), inset 0 0 60px rgba(59, 130, 246, 0.5)",
            }}
          />
        </motion.div>

        {/* Top Center Sports Light - Purple */}
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2 z-5 pointer-events-none"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.6 }}
        >
          <div 
            className="w-40 h-40 xl-plus:w-96 xl-plus:h-96 rounded-full blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.9), rgba(168, 85, 247, 0.4), transparent)",
              boxShadow: "0 0 80px rgba(168, 85, 247, 0.7), inset 0 0 60px rgba(168, 85, 247, 0.5)",
            }}
          />
        </motion.div>
        
        {/* Animated Particles Background */}
        {phase >= 1 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(120)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 xl-plus:w-4 xl-plus:h-4 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b, #ef4444, #ec4899, #a855f7)",
                }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [null, -100],
                  x: [null, Math.random() * window.innerWidth],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  delay: i * 0.05,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </div>
        )}

        {/* Main Text Section */}
        {phase >= 2 && (
          <motion.div
            className="text-center mb-12 xl-plus:mb-24 z-20"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-7xl md:text-8xl lg:text-8xl xl-plus:text-[200px] font-black mb-6 xl-plus:mb-12 tracking-wider italic drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              style={{
                fontFamily: "'Brush Script MT', 'Great Vibes', 'Lucida Handwriting', cursive",
                letterSpacing: "0.08em",
                fontWeight: "700",
                background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #1f1f1f 50%, #2a2a2a 75%, #1a1a1a 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientFlow 3s ease infinite",
                textShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              Happy Birthday
            </motion.h1>

            <motion.div
              className="text-5xl md:text-6xl lg:text-[150px] xl-plus:text-[300px] font-extrabold mb-8 xl-plus:mb-16 italic drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1, ease: "easeOut" }}
              style={{
                fontFamily: "'Playfair Display', 'Bodoni MT', serif",
                fontWeight: "900",
                background: "linear-gradient(135deg, #0f0f0f 0%, #2a2a2a 25%, #1a1a1a 50%, #222222 75%, #0f0f0f 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientFlow 3s ease infinite",
                textShadow: "0 0 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              {displayName}
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl xl-plus:text-7xl max-w-2xl xl-plus:max-w-7xl mx-auto leading-relaxed font-semibold italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 1, ease: "easeOut" }}
              style={{
                fontFamily: "'Playfair Display', 'Bodoni MT', serif",
                background: "linear-gradient(120deg, #1a1a1a, #2a2a2a, #1f1f1f, #2d2d2d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
              }}
            >
              ✨ Wishing you a year filled with joy, laughter, and unforgettable moments ✨
            </motion.p>
          </motion.div>
        )}

        {/* Celebration Elements */}
        

        {/* Premium Elegant Wish Design */}
        {phase >= 3 && (
          <motion.div
            className="text-center z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            {/* Top Decorative Line */}
            <motion.div
              className="mb-8 xl-plus:mb-16 flex items-center justify-center gap-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="h-1 w-20 xl-plus:w-40 bg-gradient-to-r from-transparent to-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 0.6 }}
              />
              <motion.div 
                className="w-3 h-3 xl-plus:w-6 xl-plus:h-6 rounded-full bg-yellow-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
              />
              <motion.div 
                className="h-1 w-20 xl-plus:w-40 bg-gradient-to-l from-transparent to-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.9, duration: 0.6 }}
              />
            </motion.div>

            {/* Make a Wish - Top Section - Character by Character */}
            <motion.p
              className="text-2xl md:text-4xl xl-plus:text-8xl uppercase tracking-[0.2em] font-bold mb-6 xl-plus:mb-12 inline-block"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ec4899 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientFlow 3s ease infinite",
                letterSpacing: "0.15em",
              }}
            >
              {['M', 'a', 'k', 'e', ' ', 'a', ' ', 'W', 'i', 's', 'h'].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -20, rotateZ: -10 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  transition={{
                    delay: 1 + i * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100,
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>

            {/* Celebratory Icons */}
            <motion.div
              className="flex justify-center gap-3 xl-plus:gap-8 mb-6 xl-plus:mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              {['🎉', '✨', '🎂', '✨', '🎉'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl xl-plus:text-7xl"
                  initial={{ scale: 0, rotateZ: -180 }}
                  animate={{ scale: 1, rotateZ: 0 }}
                  transition={{
                    delay: 2 + i * 0.12,
                    duration: 0.6,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 120,
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  >
                    {emoji}
                  </motion.div>
                </motion.span>
              ))}
            </motion.div>

            {/* Title Text Below */}
            <motion.div
              className="max-w-2xl xl-plus:max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2
                className="text-xl md:text-3xl xl-plus:text-6xl font-bold leading-relaxed mb-4 xl-plus:mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradientFlow 3s ease infinite",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.7, duration: 0.8, ease: "easeOut" }}
              >
                Close your eyes and make a magical wish
              </motion.h2>
              <motion.p
                className="text-sm md:text-lg xl-plus:text-4xl font-semibold italic"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.1, duration: 0.8, ease: "easeOut" }}
              >
                Because dreams do come true ✨
              </motion.p>
            </motion.div>

            {/* Bottom Decorative Line */}
            <motion.div
              className="mt-8 xl-plus:mt-16 flex items-center justify-center gap-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 3.5, duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="h-1 w-20 xl-plus:w-40 bg-gradient-to-r from-transparent to-pink-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 3.5, duration: 0.6 }}
              />
              <motion.div 
                className="w-3 h-3 xl-plus:w-6 xl-plus:h-6 rounded-full bg-pink-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3.9, duration: 0.4 }}
              />
              <motion.div 
                className="h-1 w-20 xl-plus:w-40 bg-gradient-to-l from-transparent to-pink-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 3.7, duration: 0.6 }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Floating Elements */}
        
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 1920}
          height={typeof window !== "undefined" ? window.innerHeight : 1080}
          recycle={false}
          numberOfPieces={800}
          colors={["#ec4899", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#06b6d4"]}
        />
      )}
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  )
}
