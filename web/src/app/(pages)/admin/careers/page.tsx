import connectDB from "@/lib/mongodb";
import CareerApplication, { ICareerApplication } from "@/models/CareerApplication";
import { format } from "date-fns";
import { Briefcase, Mail, Phone, Calendar, Eye, Download } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    await connectDB();

    // Sort by newest first
    const applications = await CareerApplication.find({}).sort({ createdAt: -1 });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Career Applications</h1>
                    <p className="text-zinc-500">Manage job applications and resumes</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium text-sm">
                    Total Applications: {applications.length}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-700">
                        <thead className="bg-zinc-50 text-zinc-900 font-semibold border-b border-zinc-200">
                            <tr>
                                <th className="px-6 py-4">Applicant</th>
                                <th className="px-6 py-4">Position</th>
                                <th className="px-6 py-4">Contact Info</th>
                                <th className="px-6 py-4">Applied Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-700">
                                        No applications received yet.
                                    </td>
                                </tr>
                            ) : (
                                applications.map((app: any) => (
                                    <tr key={app._id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg uppercase shrink-0">
                                                    {app.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-zinc-900">{app.fullName}</div>
                                                    <div className="text-xs text-zinc-700 flex items-center gap-1">
                                                        {app.qualification}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-zinc-700" />
                                                <span className="font-medium bg-zinc-100 px-2 py-0.5 rounded text-zinc-700">
                                                    {app.applyingPosition}
                                                </span>
                                            </div>
                                            {app.experience && (
                                                <div className="text-xs text-zinc-700 mt-1 pl-6">
                                                    Exp: {app.experience}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 space-y-1">
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <Mail className="w-4 h-4" />
                                                {app.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <Phone className="w-4 h-4" />
                                                {app.phone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(app.createdAt), "MMM d, yyyy")}
                                            </div>
                                            <div className="text-xs text-zinc-700 pl-6">
                                                {format(new Date(app.createdAt), "h:mm a")}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={app.imageUrl}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-700 hover:bg-zinc-50 hover:border-emerald-300 transition-all shadow-sm"
                                            >
                                                <Eye className="w-4 h-4 text-emerald-600" />
                                                <span>View Photo</span>
                                            </Link>
                                            <DeleteButton id={app._id.toString()} endpoint="/api/admin/career" />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
