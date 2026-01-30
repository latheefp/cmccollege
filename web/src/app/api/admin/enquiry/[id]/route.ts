import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await connectDB();

        const enquiry = await Enquiry.findByIdAndDelete(id);

        if (!enquiry) {
            return NextResponse.json({ message: "Enquiry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
