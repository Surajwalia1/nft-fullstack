import { Request, Response } from 'express';
import { NFT } from '../models/nftModel';  // Assuming you have a model for NFT

/**
 * Create a new NFT
 * @param req - The request object containing the NFT data (name, description, price, image, owner)
 * @param res - The response object that will send the created NFT or an error message
 */
export const createNFT = (req: Request, res: Response) => {
  const { name, description, price, owner } = req.body;  // Add owner to the request body
  const image = req.file?.path;

  if (!name || !description || !price || !image || !owner) {
     res.status(400).json({ message: 'All fields are required, including image and owner' });
     return;
  }

  const newNFT = new NFT({
    name,
    description,
    price,
    image,
    owner,  // Set the owner
  });

  newNFT
    .save()
    .then((nft) => res.status(201).json(nft))
    .catch((error) => res.status(500).json({ message: 'Error creating NFT', error }));
};

/**
 * List all NFTs
 * @param req - The request object
 * @param res - The response object that will send the list of NFTs or an error message
 */
export const listNFTs = (req: Request, res: Response) => {
  NFT.find()
    .then((nfts) => res.json(nfts))
    .catch((error) => res.status(500).json({ message: 'Error fetching NFTs', error }));
};

/**
 * Get details of a single NFT by its ID
 * @param req - The request object containing the NFT ID in `req.params`
 * @param res - The response object that will send the NFT details or an error message
 */
export const getNFTById = (req: Request, res: Response) => {
  const { id } = req.params;

  NFT.findById(id)
    .then((nft) => {
      if (!nft) {
         res.status(404).json({ message: 'NFT not found' });
         return;
      }
      res.json(nft);
    })
    .catch((error) => res.status(500).json({ message: 'Error fetching NFT', error }));
};

/**
 * Sell an NFT and transfer ownership to a new buyer
 * @param req - The request object containing the NFT ID in `req.params` and the buyer's information in `req.body`
 * @param res - The response object that will send a success message or an error message
 */
export const sellNFT = (req: Request, res: Response) => {
  const { id } = req.params;  // NFT ID to sell
  const { buyer } = req.body;  // New owner (buyer)

  if (!buyer) {
     res.status(400).json({ message: 'Buyer information is required' });
     return;
  }

  NFT.findById(id)
    .then((nft) => {
      if (!nft) {
         res.status(404).json({ message: 'NFT not found' });
         return;
      }

      if (nft.owner === buyer) {
         res.status(400).json({ message: 'Buyer is already the owner' });
         return;
      }

      nft.owner = buyer;  // Update the owner to the new buyer
      nft.save()
        .then((updatedNFT) => res.json({ message: 'NFT sold successfully', nft: updatedNFT }))
        .catch((error) => res.status(500).json({ message: 'Error updating NFT ownership', error }));
    })
    .catch((error) => res.status(500).json({ message: 'Error fetching NFT', error }));
};

/**
 * Transfer ownership of an NFT to a new owner
 * @param req - The request object containing the NFT ID in `req.params` and the new owner's details in `req.body`
 * @param res - The response object that will send a success message or an error message
 */
export const transferNFT = (req: Request, res: Response) => {
  const { id } = req.params;  // NFT ID to transfer
  const { newOwner } = req.body;  // New owner (new owner details)

  if (!newOwner) {
     res.status(400).json({ message: 'New owner information is required' });
     return;
  }

  NFT.findById(id)
    .then((nft) => {
      if (!nft) {
         res.status(404).json({ message: 'NFT not found' });
         return;
      }

      if (nft.owner === newOwner) {
         res.status(400).json({ message: 'New owner is already the current owner' });
         return;
      }

      nft.owner = newOwner;  // Transfer ownership
      nft.save()
        .then((updatedNFT) => res.json({ message: 'NFT transferred successfully', nft: updatedNFT }))
        .catch((error) => res.status(500).json({ message: 'Error updating NFT ownership', error }));
    })
    .catch((error) => res.status(500).json({ message: 'Error fetching NFT', error }));
};
