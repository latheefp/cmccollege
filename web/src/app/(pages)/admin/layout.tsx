"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, UserButton, useClerk } from '@clerk/nextjs';
import { FileText, LogOut, Loader2, Newspaper, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const pathname = usePathname();
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        // Add a small delay for the animation to be visible
        await new Promise(resolve => setTimeout(resolve, 1500));
        await signOut(() => router.push('/'));
    };

    useEffect(() => {
        if (isLoaded && user) {
            const role = (user.publicMetadata as any)?.role;
            if (role !== "admin" && role !== "super_admin") {
                // Access check logic could be implemented here as needed
            }
        }
    }, [user, isLoaded, router]);

    const navigation = [
        {
            name: 'Dashboard', href: '/admin', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Announcements', href: '/admin/announcements', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )
        },
        {
            name: 'Enquiries', href: '/admin/enquiries', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            name: 'Gallery', href: '/admin/gallery', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            name: 'News', href: '/admin/news', icon: (
                <Newspaper className="w-5 h-5" />
            )
        },
        {
            name: 'Admission Popup', href: '/admin/admission', icon: (
                <Megaphone className="w-5 h-5" />
            )
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-zinc-900 text-white fixed h-full transition-all duration-300 shadow-2xl z-50">
                <div className="h-20 flex items-center px-8 border-b border-zinc-800">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center font-bold">A</div>
                        <span className="text-xl font-bold tracking-tight">Admin Portal</span>
                    </Link>
                </div>

                <nav className="grow py-8 px-4 space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${pathname === item.href
                                ? 'bg-emerald-600/10 text-emerald-500 font-semibold'
                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <div className="p-4 border-t border-zinc-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 transition-colors w-full text-left hover:cursor-pointer"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-60 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-zinc-900 text-white transform transition-transform duration-300 ease-in-out z-70 lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="h-20 flex items-center px-8 border-b border-zinc-800 justify-between">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center font-bold">A</div>
                        <span className="text-xl font-bold tracking-tight">Admin Portal</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${pathname === item.href
                                ? 'bg-emerald-600/10 text-emerald-500 font-semibold'
                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                    <div className="mt-8 border-t border-zinc-800 pt-2">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 transition-colors w-full text-left"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="grow lg:ml-64 flex flex-col transition-all duration-300">
                {/* Debug Info Removed */}
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-zinc-200 sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold text-zinc-800 hidden sm:block">
                            {navigation.find(n => n.href === pathname)?.name || 'Admin'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center bg-zinc-100 rounded-lg px-4 py-2 text-zinc-500 focus-within:bg-zinc-200 transition-colors group">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none text-sm w-48 text-zinc-800"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-zinc-800 leading-none">
                                        {user?.fullName || user?.firstName || 'Admin User'}
                                    </p>
                                    <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-1">
                                        {(user?.publicMetadata?.role as string)?.replace('_', ' ') || 'Admin'}
                                    </p>
                                </div>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 lg:p-10 grow">
                    {children}
                </main>
            </div>

            {/* Logout Animation Overlay */}
            <AnimatePresence>
                {isLoggingOut && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 bg-zinc-900 flex flex-col items-center justify-center text-white"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
                                <Loader2 className="w-16 h-16 animate-spin text-emerald-500 relative z-10" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">Signing Out...</h2>
                            <p className="text-zinc-400">See you again soon!</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
