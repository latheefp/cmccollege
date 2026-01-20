"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Gallery from "@/components/Gallery";
import Professionals from "@/components/Professionals";
import NewsSection from "@/components/NewsSection";
import ClubsCarousel from "@/components/ClubsCarousel";
import StatsSection from "@/components/StatsSection";
import Collaborations from "@/components/Collaborations";
import Testimonials from "@/components/Testimonials";
import { usePageContent } from "@/hooks/usePageContent";
import { useAdmissionStatus } from "@/hooks/useAdmissionStatus";
import DynamicCTA from "@/components/DynamicCTA";
import HomeMap from "@/components/HomeMap";


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
  { title: "College Library", src: "/images/school_library_1768115599802.png", tag: "Campus" },
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
      className={`group relative overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-700 h-full border border-emerald-50/10
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

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroImages = [
    "https://cmcollege.edu.in/wp-content/uploads/2023/08/banner4.jpg",
    "https://ik.imagekit.io/5c6j602yp/Banner/Banner1?updatedAt=1768811009859",
    "https://ik.imagekit.io/5c6j602yp/Banner/Banner2"
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroImages.length, currentSlide]);

  // Fetch dynamic page content
  const { getImage } = usePageContent("home");
  const { isAdmissionOpen } = useAdmissionStatus();

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

  // Admission visibility state removed (handled in DynamicCTA)

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-[104px] lg:pt-[112px] bg-[#7B0046]/[0.03]">
      {/* Hero Section */}
      <section
        className="relative min-h-[45vh] md:min-h-[75vh] flex flex-col items-center justify-center py-16 px-4 md:py-32 text-white overflow-hidden"
      >
        {/* Hero Background Slider */}
        <div className="absolute inset-0 z-0 bg-black">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 1, 0.5, 1] // Luxurious smooth ease
              }}
              className="absolute inset-0"
            >
              using {heroImages[currentSlide]}
              <Image
                src={heroImages[currentSlide]}
                alt={`Hero Slide ${currentSlide + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 z-10" />
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {isAdmissionOpen && (
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-agency font-bold mb-6 uppercase">
                CM College of Arts and Science
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-2xl mx-auto">
                Committed to Excellence in Higher Education
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/admissions">
                  <button className="px-8 py-4 bg-white text-emerald-900 font-semibold rounded-lg shadow-lg hover:bg-emerald-50 transition-transform text-lg hover:scale-105 active:scale-95 cursor-pointer">
                    Admissions Open
                  </button>
                </Link>
                <Link href="/about">
                  <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-lg hover:scale-105 active:scale-95 cursor-pointer">
                    Learn More
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        )}
      </section>

      {/* About Section - Premium Bordered Card */}
      <section className="pt-14 pb-10 px-4 md:px-6 bg-[#7B0046]/[0.03]">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto bg-white border-l-4 border-l-[#7B0046] border-t border-r border-b border-gray-100 shadow-xl shadow-[#7B0046]/5 p-8 md:p-14 rounded-r-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B0046]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-start text-left">
              <h2 className="text-3xl md:text-4xl font-agency font-bold text-emerald-800 mb-6 uppercase" data-editable="about-heading" data-page="home">
                CM College
              </h2>

              <div className="text-lg text-zinc-600 leading-relaxed font-normal space-y-5 lg:columns-2 lg:gap-12 text-left md:text-justify">
                <p className="block md:hidden">
                  CM College of Arts and Science, Nadavayal, Wayanad, is a self-financing institution affiliated with the University of Calicut. Established in 2010 under the guidance of CM Center Madavoor, the college is set across 15 acres of serene campus, committed to providing quality higher education and empowering students.
                </p>
                <p data-editable="about-text-1" data-page="home" className="hidden md:block break-inside-avoid">
                  CM college of Arts and Science Nadavayal, Wayanad, Kerala is a self-financing college affiliated to the University of Calicut, run by CM center Madavoor, Calicut, Kerala. Established in the year April 2010, the college is situated in Panamaram, shares its 15 acres of beautiful land. Recognized by Government of kerala, the college is affiliated to the University of Calicut.
                </p>
                <p data-editable="about-text-2" data-page="home" className="hidden md:block break-inside-avoid">
                  In a short span of time, our college has achieved greater heights since its inception a decade ago by educating thousands of students from various parts of our states. Even though, Wayanad district has been little backward compared to many other districts of Kerala due to its geographical structure, we undertake the challenge to serve and provide better education for all the community.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <button className="px-8 py-3 bg-[#7B0046] text-white font-medium text-lg rounded-lg hover:bg-[#600036] transition-colors shadow-sm hover:shadow-md active:scale-95 cursor-pointer">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>



      {/* Collaborations Section */}
      <Collaborations />
      {/* Premium Divider */}
      <div className="relative py-4 md:py-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300/50"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-zinc-50 px-4">
            <div className="h-2 w-2 rounded-full bg-[#7B0046] ring-4 ring-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Principal section - Redesigned */}
      <section className="pb-20 pt-8 px-4 md:px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-12">
            {/* Left Side - Portrait Image */}
            <ScrollReveal delay={200} className="w-full md:w-5/12 relative h-[400px] md:h-auto md:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-transparent rounded-[32px] transform -rotate-2 scale-95 opacity-60"></div>
              <div className="relative h-full w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://ik.imagekit.io/5c6j602yp/About/principal.jpeg?updatedAt=1768826571745"
                  alt="Principal"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </ScrollReveal>

            {/* Right Side - Content Card */}
            <ScrollReveal className="w-full md:w-7/12">
              <div className="h-full bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-l-4 border-l-[#7B0046] border-t border-r border-b border-gray-100 flex flex-col justify-center relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>

                {/* Label */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B0046] animate-pulse"></span>
                  <span className="text-white text-base md:text-lg font-bold tracking-wide bg-emerald-700 px-4 py-2 md:px-6 md:py-3 rounded-xl backdrop-blur-sm border border-[#7B0046]/10">
                    Principal&apos;s Message
                  </span>
                </div>

                {/* Text Content */}
                <div className="relative mb-8 z-10 text-left md:text-justify">
                  <span className="absolute -top-6 -left-4 text-8xl text-emerald-100/40 font-serif leading-none select-none">&quot;</span>
                  <div className="relative z-10 space-y-4 text-zinc-600 leading-relaxed text-[15px] md:text-lg text-left md:text-justify">
                    <p className="block">
                      Welcome to CM College of Arts and Science. Located in the serene surroundings of Wayanad, our college offers quality education rooted in discipline and strong human values. We focus on academic excellence, practical skills, and holistic development guided by a dedicated faculty. With modern facilities, eco-friendly campus, active student life, and strong placement support, CM College provides the ideal environment for learning and growth. We warmly invite students from Kerala and beyond to join us and build a successful future.
                    </p>
                  </div>
                </div>

                {/* Signature Block */}
                <div className="mt-auto pt-6 border-t border-dashed border-zinc-200 flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-zinc-900">Shafi Pulpara</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
                      <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">CM College of Arts & Science</p>
                      <span className="hidden sm:inline text-zinc-300">•</span>
                      <p className="text-[11px] text-zinc-400">Wayanad, Kerala</p>
                    </div>
                  </div>

                  <Link href="/about">
                    <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
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
      <section className="py-12 md:py-24 px-4 md:px-6 bg-emerald-900/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-agency font-bold text-emerald-800 mb-4 uppercase" data-editable="academic-heading" data-page="home">Departments of Academic Studies</h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto" data-editable="academic-description" data-page="home">Offering a wide range of undergraduate and postgraduate programs driven by excellence.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Department Of Computer Science", slug: "computer-science", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Computer%20Science/Cs-bg.png" },
              { name: "Department Of Management", slug: "management", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Management/Management-bg.png" },
              { name: "Department Of Mass Communication And Journalism", slug: "mass-communication", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Masscom/masscom-bg.png" },
              { name: "Department Of Economics", slug: "economics", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Ecnomics/ecnomics-bg.png?updatedAt=1768828596627" },
              { name: "Department Of English", slug: "english", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/English/english-bg.jpg" },
              { name: "Department Of Commerce", slug: "commerce", img: "https://ik.imagekit.io/5c6j602yp/Departments%20/Commerce/commerce-bg.jpg" },
              { name: "Department Of Human Resource Management", slug: "human-resource-management", img: "/images/modern_science_lab_1768116682208.png" },
              { name: "Department Of Sociology", slug: "sociology", img: "/images/science_exhibition_project_1768117868795.png" }
            ].map((dept, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <Link href={`/departments/${dept.slug}`} className="block h-full">
                  <div className="group relative h-full min-h-[160px] p-6 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden flex items-center justify-center text-center cursor-default border-t border-r border-b border-gray-100 border-l-4 border-l-[#7B0046] hover:cursor-pointer">
                    {/* Hover Background Image with subtle zoom */}
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ">
                      <Image
                        src={dept.img}
                        alt={dept.name}
                        fill
                        className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {/* Dark Gradient Overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 w-full">
                      <h3 className="text-sm md:text-base font-bold text-emerald-900 group-hover:text-white transition-colors duration-300 uppercase tracking-wider leading-relaxed">
                        {dept.name}
                      </h3>

                      {/* Optional decorative line that appears on hover */}
                      <div className="h-0.5 w-0 bg-emerald-400 mx-auto mt-0 group-hover:mt-3 group-hover:w-12 transition-all duration-500 opacity-0 group-hover:opacity-100 delay-100"></div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Preview Section */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-emerald-900/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-agency font-bold text-emerald-800 mb-3 md:mb-4 uppercase" data-editable="facilities-heading" data-page="home">Campus Facilities</h2>
            <p className="text-zinc-600 text-sm md:text-lg" data-editable="facilities-description" data-page="home">Premium infrastructure providing a comfortable learning experience.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {[
              { name: "Hostel", img: "https://ik.imagekit.io/5c6j602yp/Home/images/school_hostel_1768115536813.png" },
              { name: "Masjid", img: "https://ik.imagekit.io/5c6j602yp/Home/images/school_masjid_1768115559090.png" },
              { name: "Labs", img: "https://images.unsplash.com/photo-1636036766419-4e0e3e628acc?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Library", img: "https://ik.imagekit.io/5c6j602yp/Home/images/school_library_1768115599802.png" },
              { name: "Bus", img: "https://plus.unsplash.com/premium_photo-1765918653607-eb9aeeb61327?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }

            ].map((facility, i) => (
              <ScrollReveal key={i} delay={i * 100} className="group cursor-pointer">
                <Link href="/facilities">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg border border-white">
                    <Image
                      src={facility.img}
                      alt={facility.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
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
              <button className="px-8 py-4 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                Explore All Facilities
              </button>
            </Link>
          </div>
        </div>
      </section>
      <StatsSection />

      {/* Meet the professionals section*/}
      <Professionals />

      {/* News Section */}
      <NewsSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Clubs Section */}
      <ClubsCarousel />

      {/* Stats Section */}


      {/* Gallery Preview Section */}

      <Gallery />

      {/* Map Section */}
      <HomeMap />

      {/* Call to Action Section - Dynamic & Themed */}
      <DynamicCTA className="py-24 px-6 bg-emerald-900 text-white text-center relative overflow-hidden" />


    </div>
  );
}
