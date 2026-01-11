import express, { Request, Response } from 'express';
import ImageKit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ''
});

router.get('/auth', (req: Request, res: Response) => {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.json(authenticationParameters);
});

export default router;
