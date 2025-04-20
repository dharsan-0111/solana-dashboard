export interface TokenAsset {
    interface: 'FungibleToken' | string
    id: string // Mint address
  
    content: {
      $schema: string
      json_uri: string
      files: any[]
      metadata: Record<string, any>
      links: Record<string, any>
    }
  
    authorities: any[]
  
    compression: {
      eligible: boolean
      compressed: boolean
      data_hash: string
      creator_hash: string
      asset_hash: string
      tree: string
      seq: number
      leaf_id: number
    }
  
    grouping: any[]
  
    royalty: {
      royalty_model: string
      target: string | null
      percent: number
      basis_points: number
      primary_sale_happened: boolean
      locked: boolean
    }
  
    creators: any[]
  
    ownership: {
      frozen: boolean
      delegated: boolean
      delegate: string | null
      ownership_model: string
      owner: string // wallet address
    }
  
    supply: number | null
    mutable: boolean
    burnt: boolean
  
    token_info: {
      token_accounts: {
        address: string
        balance: number // raw balance in base units
      }[]
      balance: number
      supply: number
      decimals: number
      token_program: string
      associated_token_address: string
      mint_authority: string
    }
  }
  