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
                    await fetch("/api/sync-user", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            clerkId: user.id,
                            email: user.primaryEmailAddress?.emailAddress
                        })
                    }).then(response => {
                        if (response.ok) {
                            hasSynced.current = true;
                        }
                    }).catch(() => {
                        // Silent fail for sync
                    });
                } catch (error) {
                    // Silent fail for sync
                }
            }
        };

        syncUser();
    }, [isSignedIn, user, getToken]);

    return null; // This component renders nothing
}
