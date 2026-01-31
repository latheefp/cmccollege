import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";
import { format } from "date-fns";

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectDB();

        const applications = await CareerApplication.find({}).sort({ createdAt: -1 });

        const csvHeaders = ["Name,Email,Phone,Position,Qualification,Experience,Applied Date,Photo URL,CV URL"];
        const csvRows = applications.map((app) => {
            const appliedDate = format(new Date(app.createdAt), "yyyy-MM-dd HH:mm:ss");
            const sanitizedName = `"${app.fullName?.replace(/"/g, '""') || ''}"`;
            const sanitizedEmail = `"${app.email?.replace(/"/g, '""') || ''}"`;
            const sanitizedPhone = `"${app.phone?.replace(/"/g, '""') || ''}"`;
            const sanitizedPosition = `"${app.applyingPosition?.replace(/"/g, '""') || ''}"`;
            const sanitizedQualification = `"${app.qualification?.replace(/"/g, '""') || ''}"`;
            const sanitizedExperience = `"${app.experience?.replace(/"/g, '""') || ''}"`;
            const sanitizedUrl = `"${app.imageUrl?.replace(/"/g, '""') || ''}"`;
            const sanitizedCvUrl = `"${app.cvUrl?.replace(/"/g, '""') || ''}"`;

            return `${sanitizedName},${sanitizedEmail},${sanitizedPhone},${sanitizedPosition},${sanitizedQualification},${sanitizedExperience},${appliedDate},${sanitizedUrl},${sanitizedCvUrl}`;
        });

        const csvContent = [csvHeaders, ...csvRows].join("\n");

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="career-applicants.csv"',
            },
        });
    } catch (error) {
        console.error("Export error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
