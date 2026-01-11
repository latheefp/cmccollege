import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import enquiryRoutes from './routes/enquiryRoutes';
import announcementRoutes from './routes/announcementRoutes';
import galleryRoutes from './routes/galleryRoutes';
import imagekitRoutes from './routes/imagekitRoutes';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/imagekit', imagekitRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('School API is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
