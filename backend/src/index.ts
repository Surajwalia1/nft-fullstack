

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add the user property
    }
  }
}
  import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { IUser } from './models/userModel';
import userRoutes from './routes/userRoutes';
import nftRoutes from './routes/nftRoutes';
import rateLimiter from './middlewares/rateLimitMiddleware';
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");
import cors from 'cors';


dotenv.config();

const app = express();



// Middleware to parse incoming requests
app.use(express.json());

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(rateLimiter);

app.use('/api/users', userRoutes); // User routes (for registration and login)
app.use('/api/nfts', nftRoutes);  


// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
