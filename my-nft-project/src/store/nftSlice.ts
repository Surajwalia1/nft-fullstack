// store/nftSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NftState {
  nfts: any[];
  nftData: {
    name: string;
    description: string;
    price: number;
    owner: string; // Removed image from here
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: NftState = {
  nfts: [],
  nftData: {
    name: '',
    description: '',
    price: 0,
    owner: '',
  },
  isLoading: false,
  error: null,
};

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    setNfts: (state, action: PayloadAction<any[]>) => {
      state.nfts = action.payload;
    },
    setNftData: (state, action: PayloadAction<typeof initialState.nftData>) => {
      state.nftData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setNfts, setNftData, setLoading, setError } = nftSlice.actions;

export default nftSlice.reducer;
