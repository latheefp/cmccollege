import HomeClient from "@/components/HomeClient";
import connectDB from "@/lib/mongodb";
import News from "@/models/News";
import Gallery from "@/models/Gallery";

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    await connectDB();

    const [newsData, galleryData] = await Promise.all([
      News.find({}).sort({ date: -1 }).limit(3).lean(),
      Gallery.find({}).sort({ createdAt: -1 }).limit(6).lean()
    ]);

    // Serialize data for client component
    const news = newsData.map(item => ({
      ...item,
      _id: item._id.toString(),
      date: item.date.toISOString(),
      createdAt: item.createdAt?.toISOString()
    }));

    const gallery = galleryData.map(item => ({
      ...item,
      _id: item._id.toString(),
      createdAt: item.createdAt?.toISOString()
    }));

    return { news, gallery };
  } catch (error) {
    console.error("Failed to fetch initial data:", error);
    return { news: undefined, gallery: undefined };
  }
}

export default async function Home() {
  const { news, gallery } = await getData();

  return (
    <HomeClient initialNews={news} initialGallery={gallery} />
  );
}
