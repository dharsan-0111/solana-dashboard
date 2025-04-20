'use client'

import { useBalance } from "../hooks/useBalance"

const BalanceCard = () => {
  const { data, isLoading, error } = useBalance()

  if (error) return <p className="text-red-500">Error loading balance</p>
  if (isLoading) return <p className="text-gray-300">Fetching balance...</p>

  return (
    <div className="relative group w-fit mx-auto mt-6 p-[2px] rounded-xl bg-transparent">

      {/* Persistent glow */}
      <div className="absolute inset-0 z-10 pointer-events-none group-hover:shadow-[0_0_16px_#00ffff66] rounded-xl" />

      {/* Glassy inner container */}
      <div className="relative z-30 rounded-xl bg-gradient-to-br from-[#0e0014]/80 to-[#070015]/80 backdrop-blur-xl border border-white/5 shadow-inner p-6 text-white min-w-[240px]">
        <h2 className="text-base md:text-lg font-semibold text-cyan-300 tracking-wide mb-2">SOL Balance</h2>
        <p className="text-3xl font-bold text-white">{data?.toFixed(4)} <span className="text-cyan-400">SOL</span></p>
      </div>
    </div>
  )
}

export default BalanceCard
