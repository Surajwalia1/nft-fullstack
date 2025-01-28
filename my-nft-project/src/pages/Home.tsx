import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useSignupMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton'; // For loading skeleton
import { toast, ToastContainer } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify styles

interface FormData {
  email: string;
  password: string;
}

const Home: React.FC = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // RTK mutations
  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();
  const [signupMutation, { isLoading: signupLoading }] = useSignupMutation();

  // Login Handler
  const onLogin = async (data: FormData) => {
    try {
      const response = await loginMutation(data).unwrap();
      dispatch(login({ token: response.token, user: response.user }));
      toast.success('Login successful!');
      navigate('/nft');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  // Signup Handler
  const onSignup = async (data: FormData) => {
    try {
      const response = await signupMutation(data).unwrap();
      toast.success(response.message);
      navigate('/nft');
    } catch (error) {
      toast.error('Signup failed');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      style={{ position: 'relative', backgroundColor: '#fafafa', minHeight: '100vh' }}
    >
      <header style={{ padding: '2rem', backgroundColor: '#282c34', color: 'white', textAlign: 'center' }}>
        <motion.h1 
          initial={{ scale: 0.5 }} 
          animate={{ scale: 1 }} 
          transition={{ type: 'spring', stiffness: 100 }}
          style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
        >
          Welcome to the NFT Platform
        </motion.h1>
        <Typography variant="h6" paragraph>
          Create, view, transfer, and sell NFTs with ease. Join the growing community of creators and collectors today!
        </Typography>

        <div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setOpenLogin(true)} 
              style={{ marginRight: '1rem' }}
            >
              Login
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => setOpenSignup(true)}
            >
              Signup
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <Container maxWidth="lg" style={{ marginTop: '3rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 80 }}
            >
              <Paper style={{ padding: '2rem' }} elevation={3}>
                <Typography variant="h4" gutterBottom>
                  Create & Transfer NFTs
                </Typography>
                <Typography variant="body1" paragraph>
                  Mint your digital art as NFTs and transfer ownership seamlessly. With blockchain technology, you can ensure the authenticity and value of your digital creations.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Start Creating
                </Button>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 80 }}
            >
              <Paper style={{ padding: '2rem' }} elevation={3}>
                <Typography variant="h4" gutterBottom>
                  View & Collect NFTs
                </Typography>
                <Typography variant="body1" paragraph>
                  Explore a wide variety of NFTs from artists around the world. Collect, trade, and showcase your NFT portfolio with ease.
                </Typography>
                <Button variant="contained" color="secondary" fullWidth>
                  Explore Now
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Login Dialog with Animation */}
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)} fullWidth>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <motion.form 
            onSubmit={handleSubmit(onLogin)} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <DialogActions>
              <Button onClick={() => setOpenLogin(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={loginLoading}>
                {loginLoading ? <Skeleton width={80} /> : 'Login'}
              </Button>
            </DialogActions>
          </motion.form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog with Animation */}
      <Dialog open={openSignup} onClose={() => setOpenSignup(false)} fullWidth>
        <DialogTitle>Signup</DialogTitle>
        <DialogContent>
          <motion.form 
            onSubmit={handleSubmit(onSignup)} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <DialogActions>
              <Button onClick={() => setOpenSignup(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={signupLoading}>
                {signupLoading ? <Skeleton width={80} /> : 'Signup'}
              </Button>
            </DialogActions>
          </motion.form>
        </DialogContent>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </motion.div>
  );
};

export default Home;
