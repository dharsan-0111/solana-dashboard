"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

export default function NeonCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringContainer = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [holding, setHolding] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Safe mobile detection before render
  useLayoutEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // All effects run but do nothing if mobile
  useEffect(() => {
    if (isMobile) return

    const move = (e: MouseEvent) => {
      const { clientX, clientY } = e
      cursorRef.current?.animate([{ transform: `translate(${clientX}px, ${clientY}px)` }], {
        duration: 60,
        fill: "forwards",
        easing: "ease-out",
      })
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return

    const handleHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const shouldGlow = el.closest("a") || el.closest("button") || el.getAttribute("data-cursor-hover") === "true"
      setHovering(!!shouldGlow)
    }

    window.addEventListener("mouseover", handleHover)
    return () => window.removeEventListener("mouseover", handleHover)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return

    const down = () => setHolding(true)
    const up = () => setHolding(false)

    const handleClick = (e: MouseEvent) => {
      const ring = document.createElement("div")
      ring.className = "absolute w-4 h-4 rounded-full border border-cyan-500 animate-ping"
      ring.style.left = `${e.clientX}px`
      ring.style.top = `${e.clientY}px`
      ring.style.transform = `translate(-50%, -50%)`
      ringContainer.current?.appendChild(ring)
      setTimeout(() => ring.remove(), 500)
    }

    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      window.removeEventListener("click", handleClick)
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return

    const scroll = () => {
      if (!cursorRef.current) return
      cursorRef.current.classList.add("scale-110")
      setTimeout(() => cursorRef.current?.classList.remove("scale-110"), 150)
    }

    window.addEventListener("scroll", scroll)
    return () => window.removeEventListener("scroll", scroll)
  }, [isMobile])

  // Avoid rendering anything on mobile
  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed z-50 top-0 left-0 pointer-events-none transition-all duration-150 ease-out rounded-full
          ${hovering ? "bg-pink-500/20 border-pink-400 shadow-[0_0_10px_rgba(255,0,183,0.5)]" : "bg-cyan-500/20 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"}
          ${holding ? "scale-125" : "scale-100"}
        `}
        style={{
          width: '32px',
          height: '32px',
          borderWidth: '2px',
          backdropFilter: 'blur(4px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div ref={ringContainer} className="fixed top-0 left-0 z-40 pointer-events-none" />
    </>
  )
}
