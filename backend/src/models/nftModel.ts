// src/models/nftModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface INFT extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  owner: string;  // Add owner field
}

const nftSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    owner: {
      type: String,
      required: true,  // Owner of the NFT
    },
  },
  {
    timestamps: true,
  }
);

export const NFT = mongoose.model<INFT>('NFT', nftSchema);
