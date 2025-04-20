import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchAssetsByOwner } from '../api/helius'

export const useTokens = () => {
  const { publicKey } = useWallet()

  return useQuery({
    queryKey: ['spl-tokens', publicKey?.toBase58()],
    queryFn: () => fetchAssetsByOwner({ 
      ownerAddress: publicKey!.toBase58(),
      interfaceType: 'FungibleToken',
      limit: 100,
      page: 1 
    }),
    enabled: !!publicKey,
    refetchOnWindowFocus: false
    // refetchInterval: 15000,
  })
}
