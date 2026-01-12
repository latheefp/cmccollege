"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
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
          <div className="absolute inset-0 bg-emerald-950/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
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
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8" data-editable="about-heading" data-page="home">About Our Integrated Education</h2>
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p data-editable="about-text-1" data-page="home">
                Our school offers a unique integrated +1 and +2 education system that combines rigorous academic training with deep-rooted Islamic moral values.
              </p>
              <p data-editable="about-text-2" data-page="home">
                We focus on developing well-rounded individuals who excel in their studies while maintaining a strong spiritual connection and disciplined lifestyle. Our environment is designed to nurture both the intellect and the soul.
              </p>
              <Link href="/about" className="inline-block pt-4">
                <button className="px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  Discover Our Story
                </button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-emerald-50">
            <Image
              src="/images/classroom_learning_1768115518451.png"
              alt="Classroom Learning"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              data-editable="about-image"
              data-page="home"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4" data-editable="academic-heading" data-page="home">Academic Programs</h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto" data-editable="academic-description" data-page="home">Tailored streams to help every student achieve their career goals with excellence.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "+1 Science", desc: "Intensive training in Physics, Chemistry, and Biology/Maths with a focus on competitive exams." },
              { title: "+2 Commerce", desc: "Expert guidance in Accountancy, Business Studies, and Economics for a strong future in finance." },
              { title: "Integrated Coaching", desc: "Coaching for medical and engineering entrance exams integrated with regular school hours." }
            ].map((program, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="h-full p-8 bg-white rounded-xl shadow-sm border border-emerald-50 hover:border-emerald-200 transition-all hover:shadow-md group">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4 group-hover:text-emerald-700 transition-colors uppercase tracking-wide">{program.title}</h3>
                  <p className="text-zinc-600 leading-relaxed text-lg">{program.desc}</p>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent" />
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

      {/* Gallery Preview Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-emerald-800 mb-4 tracking-tight" data-editable="gallery-heading" data-page="home">Gallery Preview</h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto italic font-medium" data-editable="gallery-description" data-page="home">Capturing the vibrant energy and excellence of our integrated campus life.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-full md:h-[800px]">
          {isLoading ? (
            // Loading State - Skeletons matching premium roundedness
            Array(5).fill(0).map((_, i) => (
              <div
                key={i}
                className={`animate-pulse bg-emerald-50 border border-emerald-100/50
                  ${i === 0 ? "md:col-span-2 md:row-span-2 min-h-[450px] rounded-[60px] md:rounded-[80px]" : "min-h-[300px] md:min-h-0"}
                  ${i === 1 ? "rounded-tr-[140px] rounded-bl-[140px] rounded-tl-[40px] rounded-br-[40px]" : ""}
                  ${i === 3 ? "rounded-tl-[140px] rounded-br-[140px] rounded-tr-[40px] rounded-bl-[40px]" : ""}
                  ${i !== 0 && i !== 1 && i !== 3 ? "rounded-[100px] md:rounded-full" : ""}
                `}
              />
            ))
          ) : (
            imagesToRender.map((item, i) => (
              <GalleryCard key={i} item={item} index={i} featured={item.featured} />
            ))
          )}
        </div>

        <div className="mt-20 relative text-center">
          {/* Subtle decoration line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent -z-10" />

          <Link href="/gallery" className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-emerald-900 font-bold rounded-2xl border border-emerald-100 hover:bg-emerald-800 hover:text-white transition-all shadow-sm hover:shadow-2xl hover:border-emerald-700">
            <span className="text-lg tracking-tight">Explore Full Gallery</span>
            <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center group-hover:bg-white group-hover:text-emerald-800 transition-colors shadow-inner">
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
          <p className="mt-6 text-zinc-400 text-sm font-medium tracking-wide">Detailed view of academic, sports, and cultural milestones</p>
        </div>
      </section>

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
