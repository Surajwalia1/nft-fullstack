// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import Home from './pages/Home';
import NFTPage from './pages/NFTPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Material UI theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}> {/* Wrap the app with the Redux provider */}
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nft" element={<NFTPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
