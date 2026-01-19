import { useState, useEffect } from "react";

export function useAdmissionStatus() {
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmissionStatus = async () => {
            try {
                const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                const apiUrl = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl.replace(/\/$/, '')}/api`;

                const res = await fetch(`${apiUrl}/admission/settings`);
                if (res.ok) {
                    const data = await res.json();
                    const now = new Date();
                    const startDate = new Date(data.startDate);
                    const endDate = new Date(data.endDate);

                    if (data.isActive && now >= startDate && now <= endDate) {
                        setIsAdmissionOpen(true);
                    }
                }
            } catch (error) {
                console.error("Failed to check admission status", error);
            } finally {
                setLoading(false);
            }
        };
        checkAdmissionStatus();
    }, []);

    return { isAdmissionOpen, loading };
}
