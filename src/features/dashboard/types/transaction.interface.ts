export interface NativeTransfer {
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }
  
  export interface TokenTransfer {
    fromUserAccount: string;
    toUserAccount: string;
    fromTokenAccount: string;
    toTokenAccount: string;
    tokenAmount: number;
    mint: string;
  }
  
  export interface RawTokenAmount {
    tokenAmount: string;
    decimals: number;
  }
  
  export interface TokenBalanceChange {
    userAccount: string;
    tokenAccount: string;
    mint: string;
    rawTokenAmount: RawTokenAmount;
  }
  
  export interface AccountData {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: TokenBalanceChange[];
  }
  
  export interface Instruction {
    accounts: string[];
    data: string;
    programId: string;
    innerInstructions: Instruction[];
  }
  
  export interface NFTEvent {
    description: string;
    type: string;
    source: string;
    amount: number;
    fee: number;
    feePayer: string;
    signature: string;
    slot: number;
    timestamp: number;
    saleType: string;
    buyer: string;
    seller: string;
    staker: string;
    nfts: {
      mint: string;
      tokenStandard: string;
    }[];
  }
  
  export interface SwapEvent {
    nativeInput: {
      account: string;
      amount: string;
    };
    nativeOutput: {
      account: string;
      amount: string;
    };
    tokenInputs: TokenBalanceChange[];
    tokenOutputs: TokenBalanceChange[];
    tokenFees: TokenBalanceChange[];
    nativeFees: { account: string; amount: string }[];
    innerSwaps: any[]; // can be defined later
  }
  
  export interface CompressedEvent {
    type: string;
    treeId: string;
    assetId: string;
    leafIndex: number;
    instructionIndex: number;
    innerInstructionIndex: number;
    newLeafOwner: string;
    oldLeafOwner: string;
  }
  
  export interface SetAuthorityEvent {
    account: string;
    from: string;
    to: string;
    instructionIndex: number;
    innerInstructionIndex: number;
  }
  
  export interface Events {
    nft?: NFTEvent;
    swap?: SwapEvent;
    compressed?: CompressedEvent;
    distributeCompressionRewards?: {
      amount: number;
    };
    setAuthority?: SetAuthorityEvent;
  }
  
  export interface HeliusTransaction {
    description: string;
    type: string;
    source: string;
    fee: number;
    feePayer: string;
    signature: string;
    slot: number;
    timestamp: number;
    nativeTransfers?: NativeTransfer[];
    tokenTransfers?: TokenTransfer[];
    accountData?: AccountData[];
    transactionError?: {
      error: string;
    };
    instructions?: Instruction[];
    events?: Events;
  }
  