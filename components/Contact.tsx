export default function Contact() {
  return (
    <section id="contact" className="bg-black text-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">Contact</h2>

          <p className="mt-3 text-white/80 max-w-2xl">
            Want to partner, sponsor, or help build the community? Send a message.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="text-sm text-white/60">Email</div>
              <a
                href="mailto:hello@madeforthissports.com"
                className="mt-2 block text-lg font-semibold hover:underline break-all"
              >
                madeforthissports@gmail.com
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="text-sm text-white/60">Phone</div>
              <a
                href="tel:+10000000000"
                className="mt-2 block text-lg font-semibold hover:underline"
              >
                +1 (682) 725-2801
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
