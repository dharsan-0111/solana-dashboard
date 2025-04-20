'use client'

import dynamic from 'next/dynamic'

// Dynamically load to avoid SSR issue
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

const ConnectWalletButton = () => {
  return (
    <div className="flex justify-end p-4">
      <WalletMultiButtonDynamic />
    </div>
  )
}

export default ConnectWalletButton
