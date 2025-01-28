import React, { useEffect } from 'react';
import { useCreateNftMutation, useGetNftsQuery } from '../services/nftApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setNfts, setNftData, setLoading, setError } from '../store/nftSlice';
import { TextField, Button, Grid, CircularProgress, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import 'react-loading-skeleton/dist/skeleton.css';
import '../index.css'; 

const NftPage = () => {
  const dispatch = useAppDispatch();
  const { nfts, nftData, isLoading, error } = useAppSelector((state) => state.nft);

  const [createNft, { isLoading: createNftLoading, error: createNftError }] = useCreateNftMutation();
  const { data: fetchedNfts, isLoading: isNftsLoading } = useGetNftsQuery();

  useEffect(() => {
    if (fetchedNfts) {
      dispatch(setNfts(fetchedNfts));
    }
  }, [fetchedNfts, dispatch]);

  // React Hook Form setup
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Create NFT Handler
  const onCreateNft = async (data: any) => {
    if (nftData.image) {
      const { name, description, price, image, owner } = nftData;
      dispatch(setLoading(true));
      await createNft({ name, description, price, image, owner })
        .then((response) => {
          if (response.data) {
            dispatch(setNfts([...nfts, response.data]));
          }
        })
        .catch(() => {
          dispatch(setError('Failed to create NFT'));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(setNftData({ ...nftData, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setNftData({ ...nftData, image: e.target.files[0] }));
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Box padding={3}>
        <Typography variant="h4" gutterBottom>Create an NFT</Typography>
        <form onSubmit={handleSubmit(onCreateNft)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                {...register('name', { required: 'Name is required' })}
                value={nftData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={createNftLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                fullWidth
                variant="outlined"
                type="number"
                {...register('price', { required: 'Price is required' })}
                value={nftData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price?.message}
                disabled={createNftLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                {...register('description', { required: 'Description is required' })}
                value={nftData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description?.message}
                disabled={createNftLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Owner Identifier"
                fullWidth
                variant="outlined"
                {...register('owner', { required: 'Owner is required' })}
                value={nftData.owner}
                onChange={handleChange}
                error={!!errors.owner}
                helperText={errors.owner?.message}
                disabled={createNftLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth disabled={createNftLoading}>
                Upload Image
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={createNftLoading}
              >
                {createNftLoading ? <CircularProgress size={24} /> : 'Create NFT'}
              </Button>
            </Grid>
          </Grid>
        </form>
        {createNftError && <Typography color="error" mt={2}>Error creating NFT: {createNftError.message}</Typography>}
        
        <Typography variant="h5" gutterBottom mt={4}>All NFTs</Typography>
        {isNftsLoading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} className="skeleton">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
                <div className="skeleton-text" />
                <div className="skeleton-text" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {nfts?.map((nft) => (
              <Grid item xs={12} sm={6} md={4} key={nft._id}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Box border={1} borderRadius={2} padding={2} boxShadow={2}>
                    <Typography variant="h6">{nft.name}</Typography>
                    <Typography variant="body2">{nft.description}</Typography>
                    <Typography variant="body2">Price: ${nft.price}</Typography>
                    <Typography variant="body2">Owner: {nft.owner}</Typography>
                    <img src={`http://localhost:5000/${nft.image}`} alt={nft.name} className="skeleton-image" />
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </motion.div>
  );
};

export default NftPage;
