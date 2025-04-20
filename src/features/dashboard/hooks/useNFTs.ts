import { useInfiniteQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchAssetsByOwner } from '../api/helius'

const cliWalletAddress = '3BLGGjURMh9xN6BtmeuT5HnHSLL4FBFiTh5ELKZe5n3X';

export const useNFTs = () => {
  const { publicKey } = useWallet()

  return useInfiniteQuery({
    queryKey: ['nfts', cliWalletAddress],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchAssetsByOwner({
        ownerAddress: cliWalletAddress,
        interfaceType: 'NonFungibleToken',
        limit: 10,
        page: pageParam as number
      }),
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
    enabled: !!publicKey,
    refetchOnWindowFocus: false,
  })
}
