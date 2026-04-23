"use client";

import AnimatedText from "@/components/AnimatedText";
import { useWaitlist } from "@/components/WaitlistProvider";

export default function Events() {
  const { openWaitlist } = useWaitlist();

  const events = [
    {
      id: 1,
      title: "MFT Scouting Day // Lagos",
      date: "May 24, 2025",
      location: "National Stadium",
      image: "/images/hero_action_bw.png",
      size: "large",
      tags: ["Elite", "U21"]
    },
    {
      id: 2,
      title: "Community Match // London",
      date: "Jun 12, 2025",
      location: "Hackney Marshes",
      image: "/images/mft_community_vibrant.png",
      size: "medium",
      tags: ["Culture"]
    },
    {
      id: 3,
      title: "Talent ID Session",
      date: "Jun 20, 2025",
      location: "Abuja",
      image: "/images/scouting_spotlight_bw.png",
      size: "small",
      tags: ["ID"]
    },
    {
      id: 4,
      title: "App Beta Launch",
      date: "July 2025",
      location: "Digital",
      image: "/images/hero_action_bw.png",
      size: "medium",
      tags: ["Tech"]
    }
  ];

  return (
    <section id="events" className="py-48 bg-black text-white noise-bg">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex flex-col gap-12 mb-48">
          <div>
            <AnimatedText
              text="Upcoming Events"
              animationClass="animate-slide-up"
              className="text-8xl md:text-[20rem] lg:text-[24rem] xl:text-[26rem] leading-[0.7] mb-16 font-secondary tracking-tighter"
              staggerDelay={0.06}
            />
            <p className="text-white/60 max-w-6xl text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-mono tracking-tight font-medium">
              Elite trials, community matches, and cultural pop-ups. <br />
              Don&apos;t miss your moment.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-sm font-bold uppercase tracking-[0.6em] text-white/10 font-display">
              Transmission // 002-X-EVENTS
            </span>
          </div>
        </div>

        {/* Abstract Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
          {/* Large Card */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-none border border-white/10 bg-white/5">
            <img
              src={events[0].image}
              alt={events[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-10 flex flex-col gap-4">
              <div className="flex gap-3">
                {events[0].tags.map(tag => (
                  <span key={tag} className="text-xs font-bold tracking-[0.2em] border border-white/30 px-3 py-1.5 rounded-none font-display uppercase">{tag}</span>
                ))}
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-none tracking-tight">{events[0].title}</h3>
              <div className="flex justify-between items-center mt-6">
                <span className="text-sm font-bold tracking-[0.2em] text-white/60 font-mono uppercase">{events[0].date}</span>
                <span className="text-sm font-bold tracking-[0.2em] text-white/60 font-mono uppercase">{events[0].location}</span>
              </div>
            </div>
          </div>

          {/* Medium Card 1 */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-none border border-white/10 bg-white/5">
            <img
              src={events[1].image}
              alt={events[1].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-secondary tracking-tight">{events[1].title}</h3>
              <div className="flex justify-between text-sm font-bold tracking-widest mt-4 text-white/60 font-display uppercase">
                <span>{events[1].date}</span>
                <span>{events[1].location}</span>
              </div>
            </div>
          </div>

          {/* Small Card */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-none border border-white/10 bg-white/5">
            <img
              src={events[2].image}
              alt={events[2].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-secondary tracking-tight">{events[2].title}</h3>
              <span className="text-xs font-bold tracking-[0.2em] mt-2 text-white/40 font-display uppercase">{events[2].location}</span>
            </div>
          </div>

          {/* Medium Card 2 - Abstract Placement */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-none border border-white/10 bg-white/5">
            <div className="absolute inset-0 p-10 flex flex-col justify-between bg-white text-black">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.3em] uppercase font-display">Next Wave</span>
                <h3 className="text-4xl font-secondary leading-none tracking-tight">Join the Network</h3>
              </div>
              <p className="text-sm font-bold tracking-tight opacity-70 leading-relaxed font-mono">
                Be first in line for the MFT Scouting App launch in Q3.
              </p>
              <button
                onClick={openWaitlist}
                className="w-full py-5 border-2 border-black font-bold text-sm uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all font-display active:scale-95"
              >
                Register Interest
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

