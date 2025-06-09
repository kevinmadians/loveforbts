"use client"

import { useState, useCallback, useEffect } from "react"

type Particle = {
  id: number
  x: number
  y: number
  color: string
  size: number
  speed: number
  opacity: number
  angle: number
}

const colors = ["#9e4ef9", "#ffde00", "#ff6b81", "#54c7ec", "#ff9ff3"]

export function ARMYLove() {
  const [particles, setParticles] = useState<Particle[]>([])

  // Create particles
  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = []
    const numberOfParticles = Math.floor(Math.random() * 15) + 10

    for (let i = 0; i < numberOfParticles; i++) {
      newParticles.push({
        id: Math.random(),
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 1,
        opacity: 1,
        angle: Math.random() * Math.PI * 2
      })
    }

    setParticles((prev) => [...prev, ...newParticles])

    // Clean up particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.includes(p)))
    }, 2000)
  }, [])

  // Handle click anywhere on the page
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createParticles(e.clientX, e.clientY)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [createParticles])

  // Animation frame for particles
  useEffect(() => {
    if (particles.length === 0) return

    const animationId = requestAnimationFrame(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + Math.cos(particle.angle) * particle.speed,
          y: particle.y + Math.sin(particle.angle) * particle.speed - particle.speed/2,
          opacity: particle.opacity - 0.02,
          size: particle.size * 0.98
        })).filter(particle => particle.opacity > 0)
      )
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [particles])

  return (
    <>
      {/* Particles */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              top: particle.y,
              left: particle.x,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>
    </>
  )
} 
