import Image from "next/image";

type Card = {
  title: string;
  image: string;
  description: string;
};

const cards: Card[] = [
  {
    title: "COMMUNITY",
    image: "/about-1.jpg",
    description:
      "We’re building a football community that connects players, teams, and fans—online and in real life.",
  },
  {
    title: "DISCOVERY",
    image: "/about-2.jpg",
    description:
      "MFT exists to spotlight hidden talent by giving players a platform to be seen and recognized.",
  },
  {
    title: "STATS & GROWTH",
    image: "/about-3.jpg",
    description:
      "Our upcoming app helps athletes track stats, measure progress, and build credibility through performance.",
  },
];

function AboutCard({ card }: { card: Card }) {
  return (
    <div>
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover"
            priority={false}
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-black/35" />
          {/* title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl drop-shadow">
                {card.title}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-white/80 leading-relaxed">{card.description}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-black text-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold">About Us</h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            Made For This Sports is built for the players who know they’re ready for
            the next level. We’re creating a platform that makes talent impossible to
            ignore.
          </p>
        </div>

        {/* 3 Image Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <AboutCard key={card.title} card={card} />
          ))}
        </div>

        {/* Mission + Vision */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-extrabold">Our Mission</h3>
            <p className="mt-3 text-white/80 leading-relaxed">
              To help football talent get discovered by creating a community and tools
              that showcase real performance, real improvement, and real potential.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-extrabold">Our Vision</h3>
            <p className="mt-3 text-white/80 leading-relaxed">
              A world where every player—no matter where they come from—can be seen,
              measured fairly, and connected to opportunities through verified stats
              and a strong football network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
