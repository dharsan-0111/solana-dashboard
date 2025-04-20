"use client"

import { useEffect, useRef } from "react"

export default function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const gridSize = 60
    let frame = 0
    let time = 0

    const particles: { x: number; y: number; speed: number; color: string }[] = []
    const particleCount = 50

    const createParticles = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0.2 + Math.random() * 0.3,
          color: Math.random() > 0.5 ? "rgba(0,183,255,0.15)" : "rgba(255,0,183,0.12)"
        })
      }
    }

    createParticles()

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      const centerX = w / 2
      const horizonY = h * 0.4
      time += 0.01

      // Clear with soft dark
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, "#070013")
      bg.addColorStop(1, "#10001d")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Fog glow
      const fog = ctx.createRadialGradient(centerX, horizonY, 0, centerX, horizonY, w * 0.8)
      fog.addColorStop(0, "rgba(0,183,255,0.2)")
      fog.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = fog
      ctx.fillRect(0, 0, w, h)

      // Horizontal grid lines with warped spacing
      for (let i = 0; i < 50; i++) {
        const y = horizonY + i * (gridSize * 0.8)
        if (y > h) break
        const alpha = 1 - (y - horizonY) / (h - horizonY)
        ctx.beginPath()
        ctx.strokeStyle = `rgba(0,183,255,${alpha * 0.1})`
        ctx.lineWidth = 1
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Vertical lines in curved perspective
      const count = 30
      for (let i = -count; i <= count; i++) {
        const offset = i * gridSize
        const x = centerX + offset
        const curve = 1 - Math.abs(i) / count
        ctx.beginPath()
        ctx.strokeStyle = `rgba(0,183,255,${curve * 0.05})`
        ctx.lineWidth = 1
        ctx.moveTo(x, horizonY)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      // ✨ Smog particles rising
      for (let p of particles) {
        p.y -= p.speed
        if (p.y < 0) {
          p.y = h + Math.random() * 50
          p.x = Math.random() * w
        }
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Vignette
      const vignette = ctx.createRadialGradient(centerX, h / 2, 0, centerX, h / 2, w * 0.9)
      vignette.addColorStop(0, "rgba(0,0,0,0)")
      vignette.addColorStop(1, "rgba(0,0,0,0.6)")
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, w, h)

      frame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    />
  )
}
