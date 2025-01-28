// src/middlewares/rateLimitMiddleware.ts
import rateLimit from 'express-rate-limit';

// Set up rate limiting rules: 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

export default limiter;
