import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Setup multer for temporary file storage
const upload = multer({ dest: 'temp/' }); // Temporary folder for file uploads

const uploadImage = () => {
    const router = express.Router();

    router.post('/upload_image', upload.single('image'), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // Extract folder and originalImagePath from the request body
            const folder = req.body.folder || 'default'; // Fallback to 'default' if folder isn't provided
            const originalImagePath = req.body.originalImagePath;

            if (!originalImagePath) {
                return res.status(400).json({ error: 'originalImagePath is required' });
            }

            // Extract the base name and extension of the original file
            const fileName = path.basename(originalImagePath, path.extname(originalImagePath));
            const fileExtension = path.extname(req.file.originalname);

            // Generate a unique file name
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const newFileName = `${fileName}-${uniqueSuffix}${fileExtension}`;

            // Build the final destination folder path
            const uploadPath = path.join('public/assets', folder);
            const finalFilePath = path.join(uploadPath, newFileName);

            // Ensure the destination folder exists
            fs.mkdirSync(uploadPath, { recursive: true });

            // Move the file from the temporary folder to the final destination
            fs.renameSync(req.file.path, finalFilePath);

            // Construct the relative URL for the uploaded file
            const imageUrl = `assets/${folder}/${newFileName}`;

            // Respond with the file URL
            res.status(200).json({ imageUrl });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Failed to upload image' });
        }
    });

    return router;
};

export default uploadImage;