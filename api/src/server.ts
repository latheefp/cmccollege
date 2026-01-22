import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import connectDB from './config/db';

import enquiryRoutes from './routes/enquiryRoutes';
import announcementRoutes from './routes/announcementRoutes';
import galleryRoutes from './routes/galleryRoutes';
import imagekitRoutes from './routes/imagekitRoutes';
import pageRoutes from './routes/pageRoutes';
import userRoutes from './routes/userRoutes';
import newsRoutes from './routes/newsRoutes';
import admissionRoutes from './routes/admissionRoutes';

dotenv.config();
connectDB();

const app = express();

/* =========================
   🔐 SECURITY MIDDLEWARE
========================= */

// Restrict CORS (important for production)
app.use(cors({
    origin: 'http://localhost:3000', // change to your domain in production
    credentials: true,
}));

app.use(express.json());

// 🔥 VERY IMPORTANT — Must come before routes
app.use(clerkMiddleware());

/* =========================
   ROUTES
========================= */

app.use('/api/enquiries', enquiryRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/imagekit', imagekitRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admission', admissionRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('CM college API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
