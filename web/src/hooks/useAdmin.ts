import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useAdmin = () => {
    const { isLoaded, sessionClaims } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (isLoaded && sessionClaims) {
            const role = (sessionClaims.metadata as any)?.role;
            setIsAdmin(role === "admin" || role === "super_admin");
        }
    }, [isLoaded, sessionClaims]);

    return {
        isAdmin,
        role: (sessionClaims?.metadata as any)?.role as string | undefined,
        isLoaded,
    };
};
