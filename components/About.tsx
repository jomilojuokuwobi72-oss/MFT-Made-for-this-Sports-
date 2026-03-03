import Image from "next/image";
import { Bounded } from "@/components/Bounded";

type Card = {
  title: string;
  image: string;
  description: string;
};

const cards: Card[] = [
  {
    title: "COMMUNITY",
    image: "/about-1.png",
    description:
      "We’re building a football community that connects players, teams, and fans—online and in real life.",
  },
  {
    title: "DISCOVERY",
    image: "/about-2.png",
    description:
      "MFT exists to spotlight hidden talent by giving players a platform to be seen and recognized.",
  },
  {
    title: "STATS & GROWTH",
    image: "/about-3.png",
    description:
      "Our upcoming app helps athletes track stats, measure progress, and build credibility through performance.",
  },
];

function AboutCard({ card }: { card: Card }) {
  return (
    <div className="group">
      <div className="glass-container overflow-hidden rounded-[28px] transition-transform duration-300 group-hover:-translate-y-2">
        <div className="relative aspect-4/3 w-full">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* overlay for contrast */}
          <div className="absolute inset-0 bg-black/40 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-0" />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

          {/* title */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-transparent font-black tracking-tight text-3xl sm:text-4xl drop-shadow-xl bg-clip-text bg-linear-to-br from-white to-white/70">
                {card.title}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-slate-400 leading-relaxed text-sm md:text-base font-medium px-2">{card.description}</p>
    </div>
  );
}

export default function About() {
  return (
    <Bounded id="about" className="relative py-32 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -left-[20%] top-[20%] h-[500px] w-[500px] rounded-full bg-primary-violet/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-[20%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
            About Us
          </h2>
          <div className="signal-line mb-8 translate-x-1" />
          <p className="mt-4 text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
            Made For This Sports is built for the players who know they’re ready for
            the next level. We’re creating a platform that makes talent impossible to
            ignore.
          </p>
        </div>

        {/* 3 Image Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {cards.map((card) => (
            <AboutCard key={card.title} card={card} />
          ))}
        </div>

        {/* Mission + Vision */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          <div className="glass-container p-10 md:p-12 transition-colors duration-300 hover:bg-white/5">
            <h3 className="text-3xl font-black uppercase text-primary-violet mb-6 tracking-wide">Our Mission</h3>
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              To help football talent get discovered by creating a community and tools
              that showcase real performance, real improvement, and real potential.
            </p>
          </div>

          <div className="glass-container p-10 md:p-12 transition-colors duration-300 hover:bg-white/5">
            <h3 className="text-3xl font-black uppercase text-violet-400 mb-6 tracking-wide">Our Vision</h3>
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              A world where every player—no matter where they come from—can be seen,
              measured fairly, and connected to opportunities through verified stats
              and a strong football network.
            </p>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
