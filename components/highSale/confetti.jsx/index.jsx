"use client"

import { useEffect, useState } from "react"



export function Confetti() {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    const newConfetti = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 2.5,
      color: ["from-blue-400", "from-cyan-400", "from-purple-400"][Math.floor(Math.random() * 3)],
    }))
    setConfetti(newConfetti)
  }, [])

  return (
    <>
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className={`absolute w-2 h-2 bg-gradient-to-b ${conf.color} to-white rounded-full`}
          style={{
            left: `${conf.left}%`,
            top: "-10px",
            animation: `fall ${conf.duration}s linear ${conf.delay}s forwards`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
