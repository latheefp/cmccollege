import mongoose from 'mongoose';
import PageContent from '../models/PageContent';
import dotenv from 'dotenv';
import path from 'path';

// Load env from project root or web root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
if (!process.env.MONGODB_URI) {
    dotenv.config({ path: path.resolve(process.cwd(), '../.env.local') });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
}

const defaultHomeContent = {
    hero_title: "Excellence in Education",
    hero_subtitle: "Empowering students for a brighter future at CM College.",
    stats_students: "2000+",
    stats_faculty: "150+",
    stats_placement: "95%",
    about_text: "CM College of Arts and Science offers a wide range of undergraduate and postgraduate programs designed to foster intellectual growth and professional development."
};

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');

        const existing = await PageContent.findOne({ slug: 'home' });
        if (existing) {
            console.log('Home content already exists, skipping seed.');
        } else {
            await PageContent.create({
                page: 'Home Page',
                slug: 'home',
                content: defaultHomeContent,
                lastUpdated: new Date()
            });
            console.log('Home content seeded successfully');
        }
    } catch (error) {
        console.error('Seeding error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
