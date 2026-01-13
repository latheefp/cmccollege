"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Gallery from "@/components/Gallery";
import Professionals from "@/components/Professionals";
import NewsSection from "@/components/NewsSection";
import { usePageContent } from "@/hooks/usePageContent";


interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
}

const placeholderImages = [
  { title: "Sports Day Excellence", src: "/images/school_sports_day_1768117809679.png", tag: "Sports" },
  { title: "Cultural Performance", src: "/images/cultural_fest_performance_1768117835053.png", tag: "Events" },
  { title: "Science Innovation", src: "/images/science_exhibition_project_1768117868795.png", tag: "Academic" },
  { title: "School Library", src: "/images/school_library_1768115599802.png", tag: "Campus" },
  { title: "Annual Awards", src: "/images/school_annual_award_ceremony_stage_1768117893644.png", tag: "Events" }
];

const GalleryCard = ({ item, index, featured }: { item: any, index: number, featured?: boolean }) => {
  const [isCaptionVisible, setIsCaptionVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play micro-carousel for small cards only
  useEffect(() => {
    if (featured || isHovered) {
      if (featured) setIsCaptionVisible(false);
      return;
    }

    const interval = setInterval(() => {
      setIsCaptionVisible((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [featured, isHovered]);

  const displayTag = item.tag === 'Classroom' ? 'Practical Session' : item.tag;

  // Premium organic shapes based on index
  const getRoundedClass = (i: number, isFeatured?: boolean) => {
    if (isFeatured) return "rounded-[60px] md:rounded-[80px]";
    if (i === 1) return "rounded-tr-[140px] rounded-bl-[140px] rounded-tl-[40px] rounded-br-[40px]";
    if (i === 3) return "rounded-tl-[140px] rounded-br-[140px] rounded-tr-[40px] rounded-bl-[40px]";
    return "rounded-[100px] md:rounded-full"; // Pill shapes
  };

  return (
    <ScrollReveal
      delay={index * 100}
      className={`group relative overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 h-full border border-emerald-50/10
        ${featured ? "md:col-span-2 md:row-span-2 min-h-[450px]" : "min-h-[300px] md:min-h-0"}
        ${getRoundedClass(index, featured)}
      `}
    >
      <div
        className="relative w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {item.src && (
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover"
            />
          )}

          <AnimatePresence mode="wait">
            {(isCaptionVisible || isHovered) && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-8 md:p-12"
              >
                <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">
                  {displayTag}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight max-w-[300px]">
                  {item.title}
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Premium glint layer */}
        <div className={`absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-1000 pointer-events-none ${getRoundedClass(index, featured)}`} />
      </div>
    </ScrollReveal>
  );
};




export default function Home() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dynamic page content
  const { content, getImage, getText } = usePageContent("home");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`);
        const data = await response.json();
        if (data.success && data.data) {
          setGalleryImages(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const imagesToRender = galleryImages.length > 0
    ? galleryImages.slice(0, 5).map((img, i) => ({
      title: img.title,
      src: img.imageUrl,
      tag: img.category,
      featured: i === 0,
      variant: i === 3
    }))
    : placeholderImages.map((img, i) => ({
      ...img,
      featured: i === 0,
      variant: i === 3
    }));

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 md:py-40 text-white overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImage("hero-bg", "/images/hero_campus_background_1768115501790.png")}
            alt="School Campus"
            fill
            className="object-cover"
            priority
            data-editable="hero-bg"
            data-page="home"
          />
          {/* Overlay removed as per request */}
        </div>

        {/* <div className="relative z-10 max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" data-editable="hero-title" data-page="home">
              {getText("hero-title", "Integrated School for Higher Secondary")}
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-2xl mx-auto" data-editable="hero-subtitle" data-page="home">
              {getText("hero-subtitle", "Academic Excellence with Islamic Values")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/admissions">
                <button className="px-8 py-4 bg-white text-emerald-900 font-semibold rounded-lg shadow-lg hover:bg-emerald-50 transition-all text-lg hover:scale-105 active:scale-95 cursor-pointer">
                  Admissions Open
                </button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-lg hover:scale-105 active:scale-95 cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div> */}
      </section>

      {/* About Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal delay={200} className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-emerald-50">
            <Image
              src="/images/college.png"
              alt="College Building"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              data-editable="about-image"
              data-page="home"
            />
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8" data-editable="about-heading" data-page="home">About Our College</h2>
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p data-editable="about-text-1" data-page="home">
                CM college of Arts and Science Nadavayal, Wayanad, Kerala is a self-financing college affiliated to the University of Calicut, run by CM center Madavoor, Calicut, Kerala. Established in the year April 2010, the college is situated in Panamaram, shares its 15 acres of beautiful land. Recognized by Government of kerala, the college is affiliated to the University of Calicut.
              </p>
              <p data-editable="about-text-2" data-page="home">
                In a short span of time, our college has achieved greater heights since its inception a decade ago by educating thousands of students from various parts of our states. Even though, Wayanad district has been little backward compared to many other districts of Kerala due to its geographical structure, we undertake the challenge to serve and provide better education for all the community.
              </p>
              <Link href="/about" className="inline-block pt-4">
                <button className="px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  Discover Our Story
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Premium Divider */}
      <div className="relative py-8 md:py-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300/50"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-zinc-50 px-4">
            <div className="h-2 w-2 rounded-full bg-emerald-200 ring-4 ring-gray-300"></div>
          </div>
        </div>
      </div>
      {/* Principal section - Redesigned */}
      <section className="py-20 px-4 md:px-6 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-12">
            {/* Left Side - Portrait Image */}
            <ScrollReveal delay={200} className="w-full md:w-5/12 relative h-[400px] md:h-auto md:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-transparent rounded-[32px] transform -rotate-2 scale-95 opacity-60"></div>
              <div className="relative h-full w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/Principal.jpeg"
                  alt="Principal"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>

            {/* Right Side - Content Card */}
            <ScrollReveal className="w-full md:w-7/12">
              <div className="h-full bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-emerald-50/50 flex flex-col justify-center relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>

                {/* Label */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span className="text-emerald-700 text-[11px] font-bold tracking-widest uppercase bg-emerald-50/80 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-emerald-100">
                    Principal&apos;s Message
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 mb-6 leading-tight relative z-10">
                  Message from <span className="text-emerald-800 block md:inline">The Principal</span>
                </h2>

                {/* Text Content */}
                <div className="relative mb-8 z-10">
                  <span className="absolute -top-6 -left-4 text-8xl text-emerald-100/40 font-serif leading-none select-none">&quot;</span>
                  <div className="relative z-10 space-y-4 text-zinc-600 leading-relaxed text-[15px] md:text-lg">
                    <p className="font-medium text-zinc-800">
                      CM college of Arts and Science Nadavayal, Wayanad, Kerala is a self-financing college affiliated to the University of Calicut.
                    </p>
                    <p>
                      In a short span of time, our college has achieved greater heights since its inception a decade ago by educating thousands of students from various parts of our states.
                    </p>
                  </div>
                </div>

                {/* Signature Block */}
                <div className="mt-auto pt-6 border-t border-dashed border-zinc-200 flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-zinc-900">Principal Name</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
                      <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">CM College of Arts & Science</p>
                      <span className="hidden sm:inline text-zinc-300">•</span>
                      <p className="text-[11px] text-zinc-400">Wayanad, Kerala</p>
                    </div>
                  </div>

                  <Link href="/about">
                    <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-200 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4" data-editable="academic-heading" data-page="home">Our Departments</h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto" data-editable="academic-description" data-page="home">Offering a wide range of undergraduate and postgraduate programs driven by excellence.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Department Of Computer Science",
              "Department Of Management",
              "Department Of Mass Communication And Journalism",
              "Department Of Economics",
              "Department Of English",
              "Department Of Commerce"
            ].map((dept, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="h-full p-6 bg-white rounded-xl shadow-sm border border-emerald-50 hover:bg-emerald-800 hover:border-emerald-800 transition-all hover:shadow-lg group cursor-default flex items-center justify-center text-center min-h-[120px]">
                  <h3 className="text-lg font-bold text-emerald-900 group-hover:text-white transition-colors uppercase tracking-wide">{dept}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4" data-editable="why-choose-heading" data-page="home">Why Choose Us</h2>
          <p className="text-zinc-600 text-lg" data-editable="why-choose-description" data-page="home">The pillars of our institution that ensure your child's success.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: "Quality Education", icon: "🎓", delay: 0 },
            { title: "Moral Training", icon: "✨", delay: 100 },
            { title: "Experienced Faculty", icon: "👨‍🏫", delay: 200 },
            { title: "Safe Campus", icon: "🛡️", delay: 300 }
          ].map((point, i) => (point &&
            <ScrollReveal key={i} delay={point.delay} className="text-center p-8 bg-emerald-50/30 rounded-2xl border border-emerald-100/50 hover:bg-white hover:shadow-xl hover:border-emerald-200 transition-all group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{point.icon}</div>
              <h3 className="text-xl font-bold text-emerald-900">{point.title}</h3>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Facilities Preview Section */}
      <section className="py-24 px-6 bg-emerald-900/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4" data-editable="facilities-heading" data-page="home">Our Facilities</h2>
            <p className="text-zinc-600 text-lg" data-editable="facilities-description" data-page="home">Premium infrastructure providing a comfortable learning experience.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Hostel", img: "/images/school_hostel_1768115536813.png" },
              { name: "Masjid", img: "/images/school_masjid_1768115559090.png" },
              { name: "Labs", img: "/images/science_lab_1768115578614.png" },
              { name: "Library", img: "/images/school_library_1768115599802.png" }
            ].map((facility, i) => (
              <ScrollReveal key={i} delay={i * 100} className="group cursor-pointer">
                <Link href="/facilities">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg border border-white">
                    <Image
                      src={facility.img}
                      alt={facility.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay removed */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                      <span className="text-xl font-bold text-white tracking-widest uppercase">{facility.name}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/facilities">
              <button className="px-8 py-4 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                Explore All Facilities
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the professionals section*/}
      <Professionals />

      {/* News Section */}
      <NewsSection />

      {/* Gallery Preview Section */}

      <Gallery />
      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-emerald-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8" data-editable="cta-heading" data-page="home">Admissions Now Open</h2>
          <p className="text-emerald-100 text-xl mb-12 max-w-2xl mx-auto" data-editable="cta-description" data-page="home">Start your journey towards academic excellence and strong moral values today.</p>
          <Link href="/contact">
            <button className="px-12 py-5 bg-white text-emerald-900 font-bold rounded-lg shadow-2xl hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all text-xl cursor-pointer">
              Enquire Now
            </button>
          </Link>
        </ScrollReveal>
      </section>

    </div>
  );
}
