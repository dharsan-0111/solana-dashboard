import { useQuery } from '@tanstack/react-query'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

export const useBalance = () => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  return useQuery({
    queryKey: ['sol-balance', publicKey?.toBase58()],
    queryFn: async () => {
      if (!publicKey) return 0
      const lamports = await connection.getBalance(new PublicKey(publicKey))
      return lamports / 1e9 // convert to SOL
    },
    enabled: !!publicKey,
    refetchOnWindowFocus: false, 
  })
}
