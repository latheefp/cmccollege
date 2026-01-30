"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteButtonProps {
    id: string;
    endpoint: string;
    onDelete?: () => void;
}

export default function DeleteButton({ id, endpoint, onDelete }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this? This action cannot be undone.")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Deleted successfully");
                router.refresh(); // Refresh server components
                if (onDelete) onDelete();
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("An error occurred");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Delete"
        >
            {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </button>
    );
}
