"use client";

import { useSignIn, useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, User, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const { isSignedIn } = useAuth();
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            console.log(">>> [SignIn] User already signed in, redirecting to /admin...");
            router.push("/admin");
        }
    }, [isLoaded, isSignedIn, router]);

    if (isLoaded && isSignedIn) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-900 text-white space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                <h1 className="text-2xl font-bold">Already signed in</h1>
                <p className="text-zinc-400">Redirecting to your dashboard...</p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded || isLoading) return;
        setIsLoading(true);
        setError("");

        try {
            console.log(">>> [SignIn] Attempting sign-in with identifier:", text);
            const result = await signIn.create({
                identifier: text,
                password,
            });

            console.log(">>> [SignIn] Status:", result.status);

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/admin");
            } else {
                console.warn(">>> [SignIn] Incomplete status:", result.status);
                setError(`Login incomplete (${result.status}). Please check your account settings.`);
            }
        } catch (err: any) {
            console.error(">>> [SignIn] Error:", err);
            const clerkErr = err.errors?.[0];
            const msg = clerkErr?.longMessage || clerkErr?.message || "Invalid username or password.";

            if (clerkErr?.code === "form_identifier_not_found") {
                setError("User account not found. Please check the spelling or try Google Login.");
            } else if (clerkErr?.code === "strategy_not_supported" || clerkErr?.message?.includes("strategy")) {
                setError("This account doesn't have a password set. Please use Google Login or set a password in Clerk.");
            } else {
                setError(msg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!isLoaded || isLoading) return;
        setIsLoading(true);
        setError("");
        try {
            console.log(">>> [SignIn] Initializing Google Redirect...");
            await signIn?.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sign-in/sso-callback",
                redirectUrlComplete: "/admin",
            });
        } catch (err: any) {
            console.error(">>> [SignIn] Google Error:", err);
            setError("Google sign-in initialization failed. Please wait a moment and try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-zinc-900">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/40 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/40 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-6"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                    <div className="p-8 space-y-8 relative">
                        {/* Decorative Top Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-pink-500 to-emerald-500"></div>

                        {/* Header */}
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-lg shadow-emerald-500/20">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
                            <p className="text-zinc-400 text-sm">Sign in to access the admin dashboard</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-200 text-sm"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-300 ml-1 uppercase tracking-wider">Email or Username</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                            placeholder="admin_user or email@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-300 ml-1 uppercase tracking-wider">Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-11 pr-12 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-emerald-400 transition-colors cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out "></div>
                                <div className="relative flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In to Dashboard</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>

                            {/* Separator */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={isLoading}
                                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                    />
                                </svg>
                                <span>Google</span>
                            </button>
                        </form>
                    </div>

                    {/* Footer decoration */}
                    <div className="bg-black/20 p-4 text-center border-t border-white/5">
                        <p className="text-xs text-zinc-500">
                            Restricted Access • Authorized Personnel Only
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
