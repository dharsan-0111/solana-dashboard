import { useInfiniteQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchAssetsByOwner } from '../api/helius'

const cliWalletAddress = process.env.NEXT_PUBLIC_CLIENT_WALLET_ADDRESS;

export const useNFTs = () => {
  const { publicKey } = useWallet()

  return useInfiniteQuery({
    queryKey: ['nfts', cliWalletAddress],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchAssetsByOwner({
        ownerAddress: cliWalletAddress as string,
        interfaceType: 'NonFungibleToken',
        limit: 10,
        page: pageParam as number
      }),
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
    enabled: !!publicKey,
    refetchOnWindowFocus: false,
  })
}
