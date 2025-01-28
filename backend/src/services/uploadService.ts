import multer from 'multer';
import path from 'path';

// Set up storage engine for Multer
const storage = multer.diskStorage({
  /**
   * Specifies the destination folder for uploaded files.
   * @param req - The request object.
   * @param file - The uploaded file.
   * @param cb - Callback to set the destination directory.
   */
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the folder where images will be stored
  },

  /**
   * Specifies the filename for the uploaded file, adding a unique suffix to avoid name collisions.
   * @param req - The request object.
   * @param file - The uploaded file.
   * @param cb - Callback to set the file name.
   */
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Add unique suffix to the filename
  }
});

// File filter to only allow image uploads
/**
 * Filters the uploaded files based on their mime type to allow only image files.
 * @param req - The request object.
 * @param file - The uploaded file.
 * @param cb - Callback to either accept or reject the file.
 */
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Allow the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
};

// Multer upload middleware with storage and file filter
const upload = multer({ storage, fileFilter });

export default upload;
