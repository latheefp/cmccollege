import ScrollReveal from "@/components/ScrollReveal";

interface Announcement {
    id: string;
    title: string;
    description: string;
    date: string;
    isNew?: boolean;
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: "1",
        title: "Admissions Open for 2024-25 Session",
        description: "We are pleased to announce that admissions for the integrated +1 and +2 programs are now open. Parents can visit the campus for counseling.",
        date: "2024-03-10",
        isNew: true,
    },
    {
        id: "2",
        title: "Annual Sports Meet Delayed",
        description: "Due to upcoming board exams, the annual sports meet has been rescheduled for the second week of April. Stay tuned for the new schedule.",
        date: "2024-03-05",
        isNew: true,
    },
    {
        id: "3",
        title: "Ramadan Office Hours",
        description: "Please note the change in office hours during the holy month of Ramadan. The administrative office will be open from 9:00 AM to 2:00 PM.",
        date: "2024-03-01",
        isNew: false,
    },
    {
        id: "4",
        title: "Academic Calendar 2024-25 Published",
        description: "The official academic calendar for the next session is now available for download. It includes all major holidays and exam dates.",
        date: "2024-02-15",
        isNew: false,
    },
];

export default function AnnouncementsPage() {
    const hasAnnouncements = MOCK_ANNOUNCEMENTS.length > 0;

    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-20">
            {/* Page Header */}
            <section className="relative py-24 px-6 bg-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Announcements
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
                            Stay updated with the latest news, notices, and events from our school community.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 px-6 max-w-5xl mx-auto flex-grow">
                {!hasAnnouncements ? (
                    <ScrollReveal className="text-center py-20 bg-emerald-50/30 rounded-3xl border border-emerald-100 border-dashed">
                        <div className="text-6xl mb-6">📢</div>
                        <h2 className="text-2xl font-bold text-emerald-900 mb-4">No New Announcements</h2>
                        <p className="text-zinc-500 max-w-md mx-auto">
                            There are currently no active notices. Please check back later for updates regarding school activities and events.
                        </p>
                    </ScrollReveal>
                ) : (
                    <div className="space-y-8">
                        {MOCK_ANNOUNCEMENTS.map((notice, i) => (
                            <ScrollReveal key={notice.id} delay={i * 100}>
                                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-emerald-50 hover:shadow-xl hover:border-emerald-200 transition-all group relative overflow-hidden">
                                    {notice.isNew && (
                                        <div className="absolute top-0 right-0">
                                            <div className="bg-emerald-600 text-white text-[10px] uppercase font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">
                                                New
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                                📄
                                            </div>
                                            <div className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
                                                Notice #{notice.id}
                                            </div>
                                        </div>
                                        <div className="text-zinc-400 font-medium flex items-center gap-2">
                                            <span className="text-emerald-800">📅</span> {new Date(notice.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-emerald-900 mb-4 group-hover:text-emerald-700 transition-colors">
                                        {notice.title}
                                    </h2>
                                    <p className="text-zinc-600 text-lg leading-relaxed">
                                        {notice.description}
                                    </p>

                                    <div className="mt-8 pt-6 border-t border-emerald-50 flex justify-end">
                                        <button className="text-emerald-800 font-bold hover:text-emerald-600 transition-colors flex items-center gap-2">
                                            Read More <span className="text-xl">→</span>
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </section>

            {/* Subscription/Help CTA */}
            <section className="py-20 px-6 bg-zinc-50 border-t border-emerald-100">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <h3 className="text-2xl font-bold text-emerald-900 mb-4">Never Miss an Update</h3>
                        <p className="text-zinc-600 text-lg mb-8">
                            We recommend checking this page regularly for important school news. For urgent queries, contact the administrative office.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="/contact" className="px-8 py-3 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-900 transition-all shadow-lg">
                                Contact Admin
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
