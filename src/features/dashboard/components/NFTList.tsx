'use client'

import { useEffect, useRef, useState } from "react";
import { useNFTs } from "../hooks/useNFTs";
import { TokenAsset } from "../types";

const NFTList: React.FC = (): React.JSX.Element => {
    const {
        data,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useNFTs();

    const loaderRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [loaderRef.current, hasNextPage]);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (error) return <p className="text-red-500">Error loading tokens</p>;
    if (isLoading) return <p className="text-gray-300">Loading tokens...</p>;
    if (!data) return <p className="text-gray-400">No tokens to show</p>;

    const nfts = data?.pages?.flat() || [];

    return (
        <div>
            {/* <h2 className="text-xl sm:text-2xl font-semibold text-cyan-300 tracking-wide mt-8 mb-4 text-center uppercase drop-shadow-[0_1px_4px_rgba(0,255,255,0.2)]">
                NFT
            </h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {nfts?.map((nft: any) => {
                    const isActive = isMobile && activeCardId === nft.id;

                    return (
                        <div
                            key={nft.id}
                            onClick={() => isMobile && setActiveCardId((prev) => prev === nft.id ? null : nft.id)}
                            className={`group relative rounded-2xl p-[2px] bg-transparent ${isActive ? 'glow-active' : ''}`}
                        >
                            {/* Animated Glow Lines */}
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-cyan-400 origin-left rounded-full z-20 group-hover:animate-[line-left_0.3s_ease-out_forwards] glow-active:animate-[line-left_0.3s_ease-out_forwards]" />
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-cyan-400 origin-right rounded-full z-20 group-hover:animate-[line-right_0.3s_ease-out_forwards] glow-active:animate-[line-right_0.3s_ease-out_forwards]" />
                            <span className="absolute left-0 bottom-0 w-0.5 h-0 bg-cyan-400 origin-bottom rounded-full z-20 group-hover:animate-[side-up_0.3s_0.3s_ease-out_forwards] glow-active:animate-[side-up_0.3s_0.3s_ease-out_forwards]" />
                            <span className="absolute right-0 bottom-0 w-0.5 h-0 bg-cyan-400 origin-bottom rounded-full z-20 group-hover:animate-[side-up_0.3s_0.3s_ease-out_forwards] glow-active:animate-[side-up_0.3s_0.3s_ease-out_forwards]" />
                            <span className="absolute top-0 left-0 h-0.5 w-0 bg-cyan-400 origin-left rounded-full z-20 group-hover:animate-[line-top-left_0.3s_0.6s_ease-out_forwards] glow-active:animate-[line-top-left_0.3s_0.6s_ease-out_forwards]" />
                            <span className="absolute top-0 right-0 h-0.5 w-0 bg-cyan-400 origin-right rounded-full z-20 group-hover:animate-[line-top-right_0.3s_0.6s_ease-out_forwards] glow-active:animate-[line-top-right_0.3s_0.6s_ease-out_forwards]" />

                            {/* Persistent Glow */}
                            <div className={`absolute inset-0 rounded-2xl z-10 pointer-events-none ${isMobile ? 'shadow-[0_0_12px_#00ffff44]' : 'group-hover:shadow-[0_0_16px_#00ffff66]'}`} />

                            {/* Actual Card */}
                            <div className="relative z-30 rounded-2xl bg-gradient-to-br from-[#0e0014]/80 to-[#070015]/80 backdrop-blur-xl border border-white/5 shadow-[inset_0_0_0.5px_#00ffff30] p-4 text-white">
                                <img
                                    src={nft.content?.files?.[0]?.uri || '/assets/nft-alt.png'}
                                    alt={nft.content?.metadata?.name || 'NFT'}
                                    className="w-full h-48 object-contain rounded-lg"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        target.onerror = null; // Prevent infinite loop if fallback fails
                                        target.src = "/assets/nft-alt.png";
                                    }}
                                />
                                <p className="text-[#E3F2F1] text-lg font-semibold mt-3">
                                    {nft.content?.metadata?.name || 'Untitled NFT'}
                                </p>
                                <p className="text-[#B1E2D1] text-sm">
                                    {nft.id.slice(0, 4)}...{nft.id.slice(-4)}
                                </p>
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
                    );
                })}
            </div>

            <div ref={loaderRef} className="h-12 flex items-center justify-center text-white text-sm">
                {isFetchingNextPage ? 'Loading more NFTs...' : ''}
            </div>
        </div>
    );
};

export default NFTList;
