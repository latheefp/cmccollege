"use client";

import { Download } from "lucide-react";

export default function CareerExportButton() {
    return (
        <a
            href="/api/admin/career/export"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
        </a>
    );
}
