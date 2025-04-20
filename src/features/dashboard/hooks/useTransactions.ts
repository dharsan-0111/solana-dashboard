// features/dashboard/hooks/useTransactions.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetchTransactions } from "../api/helius";

export const useTransactions = () => {
  const { publicKey } = useWallet();

  return useInfiniteQuery({
    queryKey: ["transactions", publicKey?.toBase58()],
    queryFn: ({ pageParam = null }) =>
      fetchTransactions({ walletAddress: publicKey!.toBase58(), before: pageParam }),
    enabled: !!publicKey,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.length) return undefined;
      return lastPage[lastPage.length - 1]?.signature;
    },
  });
};
