import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 md:py-40 text-white overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_campus_background_1768115501790.png"
            alt="School Campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-emerald-950/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Integrated School for Higher Secondary
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-2xl mx-auto">
              Academic Excellence with Islamic Values
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-emerald-900 font-semibold rounded-lg shadow-lg hover:bg-emerald-50 transition-all text-lg hover:scale-105 active:scale-95">
                Admissions Open
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-lg hover:scale-105 active:scale-95">
                Learn More
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8">About Our Integrated Education</h2>
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p>
                Our school offers a unique integrated +1 and +2 education system that combines rigorous academic training with deep-rooted Islamic moral values.
              </p>
              <p>
                We focus on developing well-rounded individuals who excel in their studies while maintaining a strong spiritual connection and disciplined lifestyle. Our environment is designed to nurture both the intellect and the soul.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-emerald-50">
            <Image
              src="/images/classroom_learning_1768115518451.png"
              alt="Classroom Learning"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Academic Programs</h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">Tailored streams to help every student achieve their career goals with excellence.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Why Choose Us</h2>
          <p className="text-zinc-600 text-lg">The pillars of our institution that ensure your child's success.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: "Quality Education", icon: "🎓", delay: 0 },
            { title: "Moral Training", icon: "✨", delay: 100 },
            { title: "Experienced Faculty", icon: "👨‍🏫", delay: 200 },
            { title: "Safe Campus", icon: "🛡️", delay: 300 }
          ].map((point, i) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Our Facilities</h2>
            <p className="text-zinc-600 text-lg">Premium infrastructure providing a comfortable learning experience.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Hostel", img: "/images/school_hostel_1768115536813.png" },
              { name: "Masjid", img: "/images/school_masjid_1768115559090.png" },
              { name: "Labs", img: "/images/science_lab_1768115578614.png" },
              { name: "Library", img: "/images/school_library_1768115599802.png" }
            ].map((facility, i) => (
              <ScrollReveal key={i} delay={i * 100} className="group">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-emerald-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Admissions Now Open</h2>
          <p className="text-emerald-100 text-xl mb-12 max-w-2xl mx-auto">Start your journey towards academic excellence and strong moral values today.</p>
          <button className="px-12 py-5 bg-white text-emerald-900 font-bold rounded-lg shadow-2xl hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all text-xl">
            Enquire Now
          </button>
        </ScrollReveal>
      </section>

    </div>
  );
}
