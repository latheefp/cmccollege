import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";
import { currentUser } from "@clerk/nextjs/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await connectDB();

        const application = await CareerApplication.findById(id);
        if (!application) {
            return NextResponse.json({ message: "Application not found" }, { status: 404 });
        }

        // Delete images from ImageKit (Photo and CV)
        const fileIdsToDelete = [];
        if (application.fileId) fileIdsToDelete.push(application.fileId);
        if (application.cvFileId) fileIdsToDelete.push(application.cvFileId);

        if (fileIdsToDelete.length > 0) {
            try {
                await Promise.all(fileIdsToDelete.map(id => imagekit.deleteFile(id)));
            } catch (error) {
                console.error("Error deleting files from ImageKit:", error);
                // Continue to delete from DB even if ImageKit fails
            }
        }

        await CareerApplication.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Application deleted successfully" });
    } catch (error) {
        console.error("Error deleting application:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
