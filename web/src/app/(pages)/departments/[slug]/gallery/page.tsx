"use client";

import { use } from "react";
import { DEPARTMENT_DATA } from "@/data/departments";
import DepartmentGallery from "@/components/DepartmentGallery";

export default function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];

    // The DepartmentGallery component handles the layout, grid, and full-screen view.
    return (
        <>
            {data.gallery && data.gallery.length > 0 ? (
                <DepartmentGallery images={data.gallery} />
            ) : (
                <div className="py-12 text-center text-zinc-500">
                    No gallery images available for this department.
                </div>
            )}
        </>
    );
}
