"use client";

import { useSignIn, useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0A0A0A] selection:bg-emerald-500/30 selection:text-emerald-400">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-linear-to-tr from-[#5D1035]/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-zinc-800/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-size-[4rem_4rem] pointer-events-none opacity-[0.03] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md p-6"
            >
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50 rounded-3xl overflow-hidden ring-1 ring-white/10">
                    <div className="p-8 space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-6">
                            <div className="relative inline-flex mb-2">
                                <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 rounded-full"></div>
                                <div className="relative w-16 h-16 rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-white/20">
                                    <Lock className="w-7 h-7 text-white drop-shadow-md" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/60 tracking-tight">Welcome Back</h1>
                                <p className="text-zinc-500 text-sm font-medium">Sign in to access the admin dashboard</p>
                            </div>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, height: 0 }}
                                    animate={{ opacity: 1, scale: 1, height: "auto" }}
                                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 text-red-200 text-sm"
                                >
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                                    <p className="leading-snug">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Email or Username</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                                            <User className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors duration-300" />
                                        </div>
                                        <input
                                            type="text"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3.5 bg-black/20 hover:bg-black/30 border border-white/5 hover:border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                            placeholder="admin_user or email@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                                            <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors duration-300" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-11 pr-12 py-3.5 bg-black/20 hover:bg-black/30 border border-white/5 hover:border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-emerald-400 distinct-colors cursor-pointer transition-colors duration-200"
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
                                className="w-full relative group overflow-hidden bg-linear-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-[#5D1035]/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span className="tracking-wide">Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="tracking-wide">Sign In to Dashboard</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>

                            {/* Separator */}
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase letter-spacing-wide">
                                    <span className="bg-[#0e0e11] px-3 text-zinc-600 font-medium">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={isLoading}
                                className="w-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/5 hover:border-white/10 text-zinc-200 font-medium py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5 opacity-90 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
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
                    <div className="bg-black/40 p-4 text-center border-t border-white/5 backdrop-blur-md">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                            Restricted Access • Authorized Personnel Only
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
