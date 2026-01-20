import AboutSidebar from "@/components/AboutSidebar";

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-white">
            {/* Header / Breadcrumb Placeholder area can be handled in individual pages or here if global */}
            <div className="bg-[#7a0b3a] text-white py-16 px-4 md:px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>
                <div className="container mx-auto relative z-10 mt-[112px]">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">About Us</h1>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <span>Home</span>
                        <span>/</span>
                        <span>About</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar */}
                    <AboutSidebar />

                    {/* Right Content */}
                    <div className="flex-1 w-full min-w-0">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
