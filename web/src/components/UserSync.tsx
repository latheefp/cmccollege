"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export default function UserSync() {
    const { isSignedIn, getToken } = useAuth();
    const { user } = useUser();
    const hasSynced = useRef(false);

    useEffect(() => {
        const syncUser = async () => {
            // Only sync if signed in and user data is loaded and not already synced in this session
            if (isSignedIn && user && !hasSynced.current) {
                try {
                    const token = await getToken();
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

                    await fetch(`${apiUrl}/api/users/sync`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    // Mark as synced to prevent duplicate calls in dev/strict mode
                    hasSynced.current = true;
                    console.log("User synced with backend");
                } catch (error) {
                    console.error("Failed to sync user:", error);
                }
            }
        };

        syncUser();
    }, [isSignedIn, user, getToken]);

    return null; // This component renders nothing
}
