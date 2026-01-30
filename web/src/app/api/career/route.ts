import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const applyingPosition = formData.get("applyingPosition") as string;
        const qualification = formData.get("qualification") as string;
        const experience = formData.get("experience") as string;
        const file = formData.get("resume") as File; // 'resume' field name for the photo file

        // 1. Validation
        if (!fullName || !email || !phone || !applyingPosition || !file) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // File Validation
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, message: "Invalid file type. Only JPG, PNG, and WEBP are allowed." },
                { status: 400 }
            );
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB
            return NextResponse.json(
                { success: false, message: "File size exceeds 2MB limit." },
                { status: 400 }
            );
        }

        // 2. Upload to ImageKit
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName: `career-${Date.now()}-${fullName.replace(/\s+/g, "_")}`,
            folder: "/career-applications/photos/",
        });

        const imageUrl = uploadResponse.url;
        const fileId = uploadResponse.fileId;

        // 3. Save to Database (No WhatsApp)
        await connectDB();
        await CareerApplication.create({
            fullName,
            email,
            phone,
            applyingPosition,
            qualification,
            experience,
            imageUrl,
            fileId,
            seen: false
        });

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully!",
            data: { imageUrl }
        });

    } catch (error) {
        console.error("Career Application Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
