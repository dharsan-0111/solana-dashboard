'use client'

import { useTransactions } from '../hooks/useTransactions';
import { useRef, useState, useEffect } from 'react';
import { ArrowRightLeft, Clock } from 'lucide-react';
import { HeliusTransaction } from '../types';

const TransactionList = () => {
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useTransactions();
    const loaderRef = useRef<HTMLDivElement>(null);
    const [selectedTx, setSelectedTx] = useState<any>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef.current, hasNextPage]);

    const transactions: HeliusTransaction[] = (data?.pages.flat() as HeliusTransaction[]) || [];

    return (
        <div className="mt-10">
            {/* <h2 className="text-cyan-400 text-lg font-semibold mb-4">Recent Transactions</h2> */}

            {isLoading ? (
                <p className="text-sm text-white/60">Loading transactions...</p>
            ) : transactions.length === 0 ? (
                <p className="text-sm text-white/60">No recent transactions found.</p>
            ) : (
                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div
                            key={`${tx.signature}-${tx.slot}`}
                            className="cursor-pointer rounded-xl bg-[#0d0d1c]/80 border border-white/10 p-4 text-white transition hover:shadow-[0_0_12px_#00ffff33]"
                            onClick={() => setSelectedTx(tx)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
                                    <p className="text-sm font-medium">{tx.type}</p>
                                </div>
                                <p className="text-xs text-white/50">
                                    <Clock className="inline-block w-4 h-4 mr-1" />
                                    {new Date(tx.timestamp * 1000).toLocaleString()}
                                </p>
                            </div>

                            <p className="text-xs mt-2 text-white/60 truncate">
                                Sig: {tx.signature}
                            </p>

                            {tx?.tokenTransfers && tx?.tokenTransfers?.length > 0 && (
                                <p className="text-sm text-pink-400 mt-1">
                                    {tx?.tokenTransfers?.length} token transfer{tx?.tokenTransfers?.length > 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                    ))}

                    <div ref={loaderRef} className="h-10 text-center text-sm text-white/60">
                        {isFetchingNextPage ? "Loading more..." : ""}
                    </div>
                </div>
            )}

            {/* Dialog for clicked transaction */}
            {/* <Dialog open={!!selectedTx} onOpenChange={() => setSelectedTx(null)}>
                <DialogContent className="bg-[#0e0014]/90 border border-white/10 backdrop-blur-lg text-white max-w-xl">
                    <DialogTitle className="text-cyan-400 text-lg flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        Transaction Details
                    </DialogTitle>

                    {selectedTx && (
                        <div className="text-sm mt-4 space-y-2 max-h-[60vh] overflow-y-auto">
                            <p><strong>Signature:</strong> {selectedTx.signature}</p>
                            <p><strong>Type:</strong> {selectedTx.type}</p>
                            <p><strong>Fee:</strong> {selectedTx.fee} lamports</p>
                            <p><strong>Slot:</strong> {selectedTx.slot}</p>
                            <p><strong>Timestamp:</strong> {new Date(selectedTx.timestamp * 1000).toLocaleString()}</p>

                            {selectedTx.tokenTransfers && selectedTx.tokenTransfers?.map((transfer: TokenTransfer, i: number) => (
                                <div key={i} className="mt-2 p-2 rounded-lg bg-[#ffffff09] border border-white/5">
                                    <p className="text-white/80 font-semibold">Token Transfer #{i + 1}</p>
                                    <p>Mint: {transfer.mint}</p>
                                    <p>From: {transfer.fromUserAccount}</p>
                                    <p>To: {transfer.toUserAccount}</p>
                                    <p>Amount: {transfer.tokenAmount}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </DialogContent>
            </Dialog> */}
        </div>
    );
};

export default TransactionList;
