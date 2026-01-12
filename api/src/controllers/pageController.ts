import { Request, Response } from 'express';
import { PageContent } from '../models/PageContent';

export const getPageContent = async (req: Request, res: Response) => {
    try {
        const page = req.params.page as string;
        const pageContent = await PageContent.findOne({ page: page.toLowerCase() });

        if (!pageContent) {
            return res.status(200).json({}); // Return empty object if no content found (static fallback)
        }

        res.status(200).json(pageContent.content);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching page content', error });
    }
};

export const publishInlineContent = async (req: Request, res: Response) => {
    try {
        const page = req.params.page as string;
        const { changes } = req.body;

        if (!changes || typeof changes !== 'object') {
            return res.status(400).json({ message: 'Invalid content changes' });
        }

        // Upsert the page content
        const pageDoc = await PageContent.findOne({ page: page.toLowerCase() });

        if (pageDoc) {
            // Merge new changes into existing map
            // We use .set() for Maps in Mongoose if it's a defined Map type, 
            // but since we defined content as type: Map, we can update it.
            // However, spreading into a POJO might overwrite logic if strictly Map.
            // Let's iterate.
            for (const [key, value] of Object.entries(changes)) {
                pageDoc.content.set(key, value);
            }
            pageDoc.lastUpdated = new Date();
            await pageDoc.save();
        } else {
            await PageContent.create({
                page: page.toLowerCase(),
                content: changes
            });
        }

        res.status(200).json({ message: 'Content published successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error publishing content', error });
    }
};
