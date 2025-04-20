'use client'

import { useTokens } from "../hooks/useTokens";
import { TokenAsset } from "../types";

const TokenList: React.FC = (): React.JSX.Element => {
  const { data, isLoading, error } = useTokens();

  if (error) return <p className="text-red-500">Error loading tokens</p>
  if (isLoading) return <p className="text-gray-300">Loading tokens...</p>
  if (!data) return <p className="text-gray-400">No tokens to show</p>

  return (
    <div className="mt-6">
      {/* <h2 className="text-xl sm:text-2xl font-semibold text-cyan-300 tracking-wide mt-8 mb-4 text-center uppercase drop-shadow-[0_1px_4px_rgba(0,255,255,0.2)]">
        SPL Tokens
      </h2> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((token: TokenAsset) => {
          const balance = token.token_info.balance / 10 ** token.token_info.decimals;
          const supply = token.token_info.supply / 10 ** token.token_info.decimals;

          const shortMint = `${token.id.slice(0, 4)}...${token.id.slice(-4)}`;
          const shortOwner = `${token.ownership.owner.slice(0, 4)}...${token.ownership.owner.slice(-4)}`;

          return (
            <div
              key={token.id}
              className="group relative rounded-2xl p-[2px] bg-transparent"
            >
              {/* Animated Glow Border */}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-cyan-400 origin-left rounded-full z-20 group-hover:animate-[line-left_0.3s_ease-out_forwards]" />
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-cyan-400 origin-right rounded-full z-20 group-hover:animate-[line-right_0.3s_ease-out_forwards]" />
              <span className="absolute left-0 bottom-0 w-0.5 h-0 bg-cyan-400 origin-bottom rounded-full z-20 group-hover:animate-[side-up_0.3s_0.3s_ease-out_forwards]" />
              <span className="absolute right-0 bottom-0 w-0.5 h-0 bg-cyan-400 origin-bottom rounded-full z-20 group-hover:animate-[side-up_0.3s_0.3s_ease-out_forwards]" />
              <span className="absolute top-0 left-0 h-0.5 w-0 bg-cyan-400 origin-left rounded-full z-20 group-hover:animate-[line-top-left_0.3s_0.6s_ease-out_forwards]" />
              <span className="absolute top-0 right-0 h-0.5 w-0 bg-cyan-400 origin-right rounded-full z-20 group-hover:animate-[line-top-right_0.3s_0.6s_ease-out_forwards]" />
              <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none group-hover:shadow-[0_0_16px_#00ffff66]" />

              {/* Token Card */}
              <div className="relative z-30 rounded-2xl bg-gradient-to-br from-[#0e0014]/80 to-[#070015]/80 backdrop-blur-xl border border-white/5 shadow-inner p-4 text-white">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-400">Mint: {shortMint}</p>
                  <div>
                    <p className="text-lg font-bold text-white">Token</p>
                    <p className="text-xs text-[#B1E2D1]">Owner: {shortOwner}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-neon-pink">
                      {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} tokens
                    </p>
                    <p className="text-xs text-gray-400">Supply: {supply}</p>
                  </div>
                </div>
              </div>

              {/* Animations */}
              <style jsx>{`
                @keyframes line-left {
                  0% { width: 0; transform: translateX(0); }
                  100% { width: 50%; transform: translateX(-100%); opacity: 0; }
                }
                @keyframes line-right {
                  0% { width: 0; }
                  100% { width: 50%; opacity: 0; }
                }
                @keyframes side-up {
                  0% { height: 0; }
                  100% { height: 100%; opacity: 0; }
                }
                @keyframes line-top-left {
                  0% { width: 0; }
                  100% { width: 50%; opacity: 0; }
                }
                @keyframes line-top-right {
                  0% { width: 0; }
                  100% { width: 50%; opacity: 0; }
                }
              `}</style>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default TokenList;
