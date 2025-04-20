import fs from 'fs';
import path from 'path';
import { Keypair, Connection, clusterApiUrl } from '@solana/web3.js';
import {
    Metaplex,
    keypairIdentity,
    toMetaplexFile
} from '@metaplex-foundation/js';
import { bundlrStorage } from '@metaplex-foundation/js'

// Config
const IMAGE_FOLDER = './nft-gallery';
const WALLET_PATH = path.resolve(process.env.HOME, '.config/solana/id.json');

// Load wallet keypair
const secret = JSON.parse(fs.readFileSync(WALLET_PATH));
const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));

// Set up connection and metaplex instance
const connection = new Connection(clusterApiUrl('devnet'));
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
    }))

async function mintNFT(imagePath, index) {
    const buffer = fs.readFileSync(imagePath)
    const file = toMetaplexFile(buffer, path.basename(imagePath))
    const imageUri = await metaplex.storage().upload(file)

    console.log(`🔼 Uploaded image ${path.basename(imagePath)} to:`, imageUri)

    const { uri } = await metaplex.nfts().uploadMetadata({
        name: `Sample NFT #${index + 1}`,
        description: `This is NFT number ${index + 1} minted via script.`,
        image: imageUri,
    })

    console.log(`📝 Uploaded metadata to:`, uri)

    // 👇 generate a stable mint address
    const mint = Keypair.generate()

    const { nft } = await metaplex.nfts().create({
        uri,
        name: `Sample NFT #${index + 1}`,
        sellerFeeBasisPoints: 0,
        mint, // 👈 pass it here manually
    })

    console.log(`✅ Minted NFT ${index + 1}: ${nft.address.toBase58()}\n`)
}

async function mintAllNFTs() {
    const files = fs
        .readdirSync(IMAGE_FOLDER)
        .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

    if (files.length === 0) {
        console.error('❌ No valid images found in ./nft-gallery. Aborting mint process.')
        process.exit(1)
    }
        
    console.log(`🚀 Found ${files.length} images. Starting minting...\n`);

    for (let i = 0; i < files.length; i++) {
        const imagePath = path.join(IMAGE_FOLDER, files[i]);
        try {
            await mintNFT(imagePath, i);
        } catch (err) {
            console.error(`❌ Failed to mint NFT ${i + 1}:`, err);
        }
    }

    console.log('🎉 All done!');
}

mintAllNFTs();
