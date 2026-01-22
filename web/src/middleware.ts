import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: string;
        };
    }
}

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isSyncRoute = createRouteMatcher(["/api/sync-user"]);

export default clerkMiddleware(async (auth, req) => {
    console.log('Middleware Request:', req.url);

    // Log all requests for debugging
    if (isSyncRoute(req)) {
        console.log('>>> [Middleware] Sync route detected');
    }

    // Protect all routes starting with `/admin`
    if (isAdminRoute(req)) {
        // Redirect to sign-in if not authenticated
        const session = await auth();

        if (!session.userId) {
            return session.redirectToSignIn();
        }

        // Check for admin role in metadata
        const role = session.sessionClaims?.metadata?.role;
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
