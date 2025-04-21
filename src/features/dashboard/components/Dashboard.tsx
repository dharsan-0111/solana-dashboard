'use client'

import ConnectWalletButton from './ConnectWalletButton'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import BalanceCard from './BalanceCard'
import TokenList from './TokenList'
import NFTList from './NFTList'
import NeonBackground from './neon-background'
import TransactionList from './TransactionsList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'

const queryClient = new QueryClient()

const Dashboard = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <NeonCursor /> */}
      <NeonBackground />
      <main className="min-h-screen text-white p-6">
        <ConnectWalletButton />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,255,255,0.3)]">
          <span className="inline-block">
            Solana Wallet Dashboard
            <div className="h-0.5 bg-cyan-400 mt-2 mb-6 rounded-full shadow-[0_0_8px_#00ffffaa]" style={{ width: '100%' }}></div>
          </span>
        </h1>

        <div className="flex flex-col gap-4 w-full mt-8">
          <BalanceCard />
          <Tabs defaultValue="tokens" className="w-full max-w-screen-md mx-auto">
            <TabsList className="flex justify-center gap-2 mx-auto bg-black/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/10 shadow-md">
              {["tokens", "nfts", "transactions"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="px-4 py-1.5 cursor-pointer text-sm md:text-base font-medium text-white transition-all duration-300 rounded-full hover:bg-cyan-400/20 hover:shadow-[0_0_10px_#00ffff66] hover:text-cyan-300 data-[state=active]:bg-cyan-400/20 data-[state=active]:shadow-[0_0_10px_#00ffff66] data-[state=active]:text-cyan-300"
                >
                  {tab === "tokens" ? "Tokens" : tab === "nfts" ? "NFT" : "Transactions"}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="tokens" className="mt-6"><TokenList /></TabsContent>
            <TabsContent value="nfts" className="mt-6"><NFTList /></TabsContent>
            <TabsContent value="transactions" className="mt-6"><TransactionList /></TabsContent>
          </Tabs>
        </div>
      </main>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default Dashboard
