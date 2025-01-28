// src/routes/nftRoutes.ts
import express from 'express';
import upload from '../services/uploadService';  // Import the upload service
import { createNFT, listNFTs, getNFTById, sellNFT, transferNFT } from '../controllers/nftController';  // Import controller functions
import { authenticateToken } from '../middlewares/authMiddleware';  // Import JWT authentication middleware

const router = express.Router();

// Route to create an NFT (with image upload)
router.post('/create', authenticateToken, upload.single('image'), (req, res) => {
  createNFT(req, res);
});

// Route to list all NFTs
router.get('/', listNFTs);

// Route to get details of a specific NFT by its ID
router.get('/:id', getNFTById);

// Route to sell NFT (transfer ownership)
router.put('/:id/sell', authenticateToken, sellNFT);

// Route to transfer NFT (change ownership)
router.put('/:id/transfer', authenticateToken, transferNFT);

export default router;
