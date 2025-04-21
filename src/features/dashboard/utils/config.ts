// utils/config.ts

const ENV = process.env.NEXT_PUBLIC_HELIUS_ENV ?? "devnet"; // fallback to devnet

export const IS_DEVNET = ENV === "devnet";

export const SOLANA_RPC_URL = IS_DEVNET
  ? "https://api.devnet.solana.com"
  : "https://api.mainnet-beta.solana.com";

export const HELIUS_RPC_URL = IS_DEVNET
  ? `https://devnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`
  : `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;

export const TRANSACTIONS_URL = IS_DEVNET
  ? `https://api-devnet.helius.xyz/v0/transactions?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`
  : `https://api.helius.xyz/v0/transactions?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;
