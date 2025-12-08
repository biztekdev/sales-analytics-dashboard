"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Share2, Trophy, Sparkles } from "lucide-react"

export default function CelebrationScreen() {

  const [particles, setParticles] = useState([])

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    const newParticles = Array.from({ length: 280 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      xlPlusSize: Math.random() * 12 + 4,
      duration: Math.random() * 3 + 5,
    }))
    setParticles(newParticles)
  }, [])

  // Fire premium confetti bursts using canvas-confetti
  useEffect(() => {
    let intervalId
    let confettiInstance

    const launch = async () => {
      const module = await import("canvas-confetti")
      confettiInstance = module.default
      const shoot = () => {
        const defaults = { origin: { y: 0.1 }, ticks: 200, zIndex: 9999 }
        confettiInstance({ ...defaults, particleCount: 120, spread: 80, startVelocity: 55, scalar: 1 })
        confettiInstance({ ...defaults, particleCount: 80, spread: 120, startVelocity: 65, scalar: 1.2, angle: 60, origin: { x: 0.1, y: 0.2 } })
        confettiInstance({ ...defaults, particleCount: 80, spread: 120, startVelocity: 65, scalar: 1.2, angle: 120, origin: { x: 0.9, y: 0.2 } })
      }
      shoot()
      intervalId = setInterval(shoot, 2800)
    }

    launch()

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (confettiInstance) confettiInstance.reset?.()
    }
  }, [])



  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 xl-plus:w-[400px] xl-plus:h-[400px] w-96 h-96 bg-gradient-to-br from-blue-500/40 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-1/4 left-1/4 xl-plus:w-[600px] xl-plus:h-[600px] w-80 h-80 bg-gradient-to-br from-purple-500/30 to-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 -right-1/4 xl-plus:w-[400px] xl-plus:h-[400px] w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.75s" }}
        />
      </div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-300 to-cyan-200"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="mb-12 xl-plus:mb-20 animate-bounce">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full blur-2xl opacity-60 animate-pulse" />
            <div className="relative w-24 h-24 xl-plus:w-48 xl-plus:h-48 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl border border-cyan-300/30">
              <Trophy className="w-12 h-12 xl-plus:w-24 xl-plus:h-24 text-white" />
            </div>
          </div>
        </div>

        {/* Main heading section */}
        <div className="text-center space-y-6 xl-plus:space-y-12 mb-16 xl-plus:mb-32">
          <div className="space-y-2 xl-plus:space-y-4 ">
            <h1 className="text-8xl md:text-9xl  xl-plus:text-[300px] font-black  bg-clip-text text-[#51C8FF] bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 leading-tight  italic" style={{ fontFamily: "'" }}>
              Record Broken 
            </h1>
            {/* <h3 className="text-6xl md:text-7xl xl-plus:text-[220px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 mt-4 xl-plus:mt-8">
              ACHIEVED
            </h3> */}
          </div>
          <p className="text-xl md:text-2xl xl-plus:text-6xl text-blue-200/70 font-light tracking-wider mt-6 xl-plus:mt-12 flex items-center justify-center gap-2 xl-plus:gap-6">
            <Sparkles className="w-6 h-6 xl-plus:w-14 xl-plus:h-14" />
            Milestone Unlocked
            <Sparkles className="w-6 h-6 xl-plus:w-14 xl-plus:h-14" />
          </p>
          
          {/* Name with neon lights effect */}
          <div className="mt-8 xl-plus:mt-16">
            <h1  className="text-6xl font-black md:text-8xl xl-plus:text-[250px] tracking-wider relative inline-block">
              <span  className="relative text-transparent bg-clip-text animate-[blink_3s_ease-in-out_infinite,shimmer_3s_linear_infinite]" style={{
                backgroundImage: 'linear-gradient(90deg, #93c5fd 0%, #67e8f9 25%, #60a5fa 50%, #93c5fd 75%, #67e8f9 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                fontWeight: 900
              }}>
                Ali Hassan
              </span>
            </h1>
          </div>
        </div>

        {/* Single amount display */}
        <div className="mb-16 xl-plus:mb-32">
          <div className="text-center space-y-4 xl-plus:space-y-8">
            <span className="text-9xl md:text-[12rem] xl-plus:text-[500px] font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400" >
              ${formatNumber(90000)} 
            </span>
            <p className="text-2xl md:text-3xl xl-plus:text-7xl text-blue-200/70 font-light tracking-wider uppercase">
              Amount Received
            </p>
          </div>
        </div>

        {/* Bottom celebratory text */}
        <p className="text-blue-300/50 text-sm md:text-base xl-plus:text-4xl font-light tracking-widest">
          🎉 Thank you for the incredible success
        </p>
      </div>

      {/* Audio element */}
      {/* <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
        loop
      /> */}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-40px) translateX(20px) rotate(180deg);
            opacity: 0.7;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0% {
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          10% {
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </main>
  )
}
