import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-20">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 px-6 md:py-40 bg-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Subtle Geometric Pattern Alternative */}
          <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Integrated School for Higher Secondary
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Academic Excellence with Islamic Values
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-emerald-900 font-semibold rounded-lg shadow-lg hover:bg-emerald-50 transition-all text-lg">
              Admissions Open
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">About Our Integrated Education</h2>
            <div className="space-y-4 text-lg text-zinc-600 leading-relaxed">
              <p>
                Our school offers a unique integrated +1 and +2 education system that combines rigorous academic training with deep-rooted Islamic moral values.
              </p>
              <p>
                We focus on developing well-rounded individuals who excel in their studies while maintaining a strong spiritual connection and disciplined lifestyle. Our environment is designed to nurture both the intellect and the soul.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl bg-zinc-100 flex items-center justify-center border-2 border-emerald-100 overflow-hidden shadow-inner">
            {/* Placeholder for About Image */}
            <div className="text-emerald-800/20">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9.5l8.11 4.41 8.11-4.41L12 5.09 3.89 9.5zM5 13.18v2.82l7 3.82 7-3.82v-2.82l-7 3.82-7-3.82z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-20 px-6 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Academic Programs</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Tailored streams to help every student achieve their career goals with excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "+1 Science", desc: "Intensive training in Physics, Chemistry, and Biology/Maths with a focus on competitive exams." },
              { title: "+2 Commerce", desc: "Expert guidance in Accountancy, Business Studies, and Economics for a strong future in finance." },
              { title: "Integrated Coaching", desc: "Coaching for medical and engineering entrance exams integrated with regular school hours." }
            ].map((program, i) => (
              <div key={i} className="p-8 bg-white rounded-xl shadow-sm border border-emerald-50 hover:border-emerald-200 transition-colors">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">{program.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">Why Choose Us</h2>
          <p className="text-zinc-600">The pillars of our institution that ensure your child's success.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Quality Education", icon: "🎓" },
            { title: "Moral Training", icon: "✨" },
            { title: "Experienced Faculty", icon: "👨‍🏫" },
            { title: "Safe Campus", icon: "🛡️" }
          ].map((point, i) => (
            <div key={i} className="text-center p-6">
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-lg font-bold text-emerald-900">{point.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Preview Section */}
      <section className="py-20 px-6 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Our Facilities</h2>
            <p className="text-zinc-600">Premium infrastructure providing a comfortable learning experience.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Hostel", icon: "🏠" },
              { name: "Masjid", icon: "🕌" },
              { name: "Labs", icon: "🧪" },
              { name: "Library", icon: "📚" }
            ].map((facility, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-emerald-100">
                <div className="text-3xl mb-3">{facility.icon}</div>
                <span className="font-semibold text-emerald-900">{facility.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-emerald-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Admissions Now Open</h2>
          <p className="text-emerald-100 text-lg mb-10">Start your journey towards academic excellence and strong moral values today.</p>
          <button className="px-10 py-4 bg-white text-emerald-900 font-bold rounded-lg shadow-xl hover:scale-105 transition-transform text-lg">
            Enquire Now
          </button>
        </div>
      </section>

    </div>
  );
}
