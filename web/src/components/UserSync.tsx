"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export default function UserSync() {
    const { isLoaded, isSignedIn, getToken } = useAuth();
    const { user } = useUser();
    const hasSynced = useRef(false);

    useEffect(() => {
        const syncUser = async () => {
            // Only sync if signed in and user data is loaded and not already synced in this session
            if (isLoaded && isSignedIn && user && !hasSynced.current) {
                try {
                    const token = await getToken();
                    console.log("Token obtained:", token ? token.substring(0, 20) + "..." : "null");
                    console.log("Attempting sync to /api/sync-user...");
                    const response = await fetch("/api/sync-user", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            clerkId: user.id,
                            email: user.primaryEmailAddress?.emailAddress
                        })
                    });

                    if (response.ok) {
                        hasSynced.current = true;
                        console.log("User synced with backend successfully");
                    } else {
                        console.error("User sync failed with status:", response.status);
                        const data = await response.json().catch(() => ({}));
                        console.error("Sync error details:", data);
                    }
                } catch (error) {
                    console.error("Failed to sync user due to network/parsing error:", error);
                }
            }
        };

        syncUser();
    }, [isSignedIn, user, getToken]);

    return null; // This component renders nothing
}
