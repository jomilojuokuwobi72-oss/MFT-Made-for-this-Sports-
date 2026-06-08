"use client";

import AnimatedText from "@/components/AnimatedText";
import { useWaitlist } from "@/components/WaitlistProvider";
import ScrollReveal from "@/components/ScrollReveal";
import Button from "@/components/ui/Button";
import RippleImage from "@/components/RippleImage";

export default function Events() {
  const { openWaitlist } = useWaitlist();

  const events = [
    {
      id: 1,
      title: "MFT Scouting Day // Lagos",
      date: "May 24, 2025",
      location: "National Stadium",
      image: "/images/hero_action_bw.png",
      tags: ["Elite", "U21"]
    },
    {
      id: 2,
      title: "Community Match // London",
      date: "Jun 12, 2025",
      location: "Hackney Marshes",
      image: "/images/mft_community_vibrant.png",
      tags: ["Culture"]
    },
    {
      id: 3,
      title: "Talent ID Session",
      date: "Jun 20, 2025",
      location: "Abuja",
      image: "/images/scouting_spotlight_bw.png",
      tags: ["ID"]
    },
    {
      id: 4,
      title: "The Urban League // London",
      date: "Aug 05, 2025",
      location: "Shoreditch Powerleague",
      image: "/images/london_street_match.png",
      tags: ["League"]
    },
    {
      id: 5,
      title: "Pro Academy Trials",
      date: "Aug 15, 2025",
      location: "Manchester",
      image: "/images/vibrant_training.png",
      tags: ["Elite"]
    },
    {
      id: 6,
      title: "Midnight Scouting",
      date: "Sep 01, 2025",
      location: "Paris",
      image: "/images/soccer_scouting.png",
      tags: ["Scouting"]
    },
    {
      id: 7,
      title: "MFT Culture Clip",
      date: "Live Now",
      location: "Global",
      video: "/clipage.mp4",
      tags: ["Culture"]
    }
  ];

  return (
    <section id="events" className="py-28 sm:py-40 md:py-48 bg-black text-white noise-bg">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex flex-col gap-12 mb-48">
          <div>
            <AnimatedText
              text="Upcoming Events"
              animationClass="animate-slide-up"
              className="text-[clamp(4rem,10vw,6.25rem)] leading-[0.8] mb-12 font-secondary"
              staggerDelay={0.06}
            />
            <p className="text-white/90 max-w-6xl text-[clamp(1.5rem,6vw,2.75rem)] leading-[1.1] font-medium">
              Elite trials, community matches, and cultural pop-ups. <br />
              Don&apos;t miss your moment.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-3xl font-bold uppercase text-white/60 font-display">
              Scouting Report // MFT Events
            </span>
          </div>
        </div>

        {/* Extended Bento Grid test */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[400px]">
          {/* Row 1: Large + Medium */}
          <div className="md:col-span-2 md:row-span-2">
            <ScrollReveal animation="blur-in" className="h-full">
              <div className="relative h-full group overflow-hidden rounded-none border border-white/10 bg-white/5">
                <RippleImage
                  src={events[0].image!}
                  alt={events[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-10 flex flex-col gap-4">
                  <div className="flex gap-3">
                    {events[0].tags.map(tag => (
                      <span key={tag} className="text-xl font-bold border border-white/60 px-3 py-1.5 rounded-none font-display uppercase">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-h2 font-secondary leading-none">{events[0].title}</h3>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm font-bold text-white/80 font-mono uppercase">{events[0].date}</span>
                    <span className="text-sm font-bold text-white/80 font-mono uppercase">{events[0].location}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal animation="slide-up" delay={0.1} className="h-full">
              <div className="relative h-full group overflow-hidden rounded-none border border-white/10 bg-white/5">
                <RippleImage
                  src={events[1].image!}
                  alt={events[1].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-h3 font-secondary">{events[1].title}</h3>
                  <div className="flex justify-between text-xl font-bold mt-4 text-white/80 font-display uppercase">
                    <span>{events[1].date}</span>
                    <span>{events[1].location}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Row 2: Small + Small */}
          <div className="md:col-span-1">
            <ScrollReveal animation="scale-in" delay={0.2} className="h-full">
              <div className="relative h-full group overflow-hidden rounded-none border border-white/10 bg-white/5">
                <RippleImage
                  src={events[2].image!}
                  alt={events[2].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-h3 font-secondary leading-tight">{events[2].title}</h3>
                  <span className="text-xl font-bold mt-2 text-white/70 font-display uppercase">{events[2].location}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-1">
            <ScrollReveal animation="blur-in" delay={0.3} className="h-full">
              <div className="relative h-full group overflow-hidden rounded-none border border-black/10 p-10 flex flex-col justify-between bg-white text-black">
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold uppercase font-display">Next Wave</span>
                  <h3 className="text-h3 font-secondary leading-none">Join the Network</h3>
                </div>
                <p className="text-sm font-bold opacity-90 leading-relaxed font-mono">
                  Be first in line for the MFT Scouting App launch in Q3.
                </p>
                <Button
                  onClick={openWaitlist}
                  variant="solid"
                  tone="onLight"
                  fullWidth
                  className="text-xl"
                >
                  Register
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Row 3: Video (Wide) + Small */}
          <div className="md:col-span-3">
            <ScrollReveal animation="fade-in" className="h-full">
              <div className="relative h-full group overflow-hidden rounded-none border border-white/10 bg-white/5">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                >
                  <source src={events[6].video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <span className="text-xl font-bold uppercase font-display text-white/80 mb-2">Featured Clip</span>
                  <h3 className="text-h2 font-secondary leading-none uppercase">{events[6].title}</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-1">
            <ScrollReveal animation="slide-up" delay={0.1} className="h-full">
              <div className="relative h-full group overflow-hidden rounded-none border border-white/10 bg-white/5">
                <RippleImage
                  src={events[4].image!}
                  alt={events[4].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-h3 font-secondary leading-tight">{events[4].title}</h3>
                  <span className="text-sm font-bold font-mono text-white/60 mt-4 uppercase">{events[4].location}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Row 4: Medium + Medium */}
          <div className="md:col-span-2">
            <ScrollReveal animation="blur-in" className="h-full">
              <div className="relative h-full group overflow-hidden rounded-none border border-white/10 bg-white/5">
                <RippleImage
                  src={events[3].image!}
                  alt={events[3].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <h3 className="text-h2 font-secondary uppercase">{events[3].title}</h3>
                  <div className="flex justify-between items-center mt-6 font-display font-bold text-xl opacity-80 uppercase">
                    <span>{events[3].date}</span>
                    <span>{events[3].location}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal animation="scale-in" delay={0.2} className="h-full">
              <div className="relative h-full group overflow-hidden rounded-none border border-white/10 bg-white/5">
                <RippleImage
                  src={events[5].image!}
                  alt={events[5].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all" />
                <div className="absolute inset-0 p-12 flex flex-col justify-center items-center text-center">
                  <span className="text-xl font-bold font-display uppercase mb-4 opacity-70">Global Spotlight</span>
                  <h3 className="text-h2 font-secondary leading-none uppercase">{events[5].title}</h3>
                  <span className="mt-8 px-10 py-4 border border-white/30 font-display font-bold text-xl uppercase">{events[5].location}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

