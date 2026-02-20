import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-violet-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-violet-900/50">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Sketcha"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-violet-100">Sketcha</span>
          </div>
          <Link
            href="/demo"
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors"
          >
            Try Demo
          </Link>
        </nav>
      </header>

      <main>
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-800/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-3xl">
            <div className="mb-8 flex justify-center">
              <Image
                src="/icon.png"
                alt="Sketcha"
                width={120}
                height={120}
                className="rounded-2xl shadow-2xl shadow-violet-600/30"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-200 via-violet-100 to-violet-300 bg-clip-text text-transparent">
              Sketcha
            </h1>

            <p className="text-xl md:text-2xl text-violet-300 mb-10 max-w-2xl mx-auto">
              Express your ideas with fluid, intuitive drawing. Create beautiful
              sketches with real-time collaboration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-violet-600/25"
              >
                Start Drawing
              </Link>
              <button
                type="button"
                className="px-8 py-4 bg-violet-900/50 hover:bg-violet-800/50 text-violet-200 rounded-xl font-semibold text-lg transition-all border border-violet-700/50"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-violet-100">
              Built for Creators
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#12121a] p-8 rounded-2xl border border-violet-900/30 hover:border-violet-700/50 transition-colors">
                <div className="w-12 h-12 bg-violet-900/50 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-violet-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-violet-100">
                  Intuitive Tools
                </h3>
                <p className="text-violet-300">
                  Powerful yet simple drawing tools that feel natural. Pencil,
                  brush, eraser, and more at your fingertips.
                </p>
              </div>

              <div className="bg-[#12121a] p-8 rounded-2xl border border-violet-900/30 hover:border-violet-700/50 transition-colors">
                <div className="w-12 h-12 bg-violet-900/50 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-violet-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-violet-100">
                  Real-time Collaboration
                </h3>
                <p className="text-violet-300">
                  Work together with others in real-time. Share your canvas and
                  create together, no matter the distance.
                </p>
              </div>

              <div className="bg-[#12121a] p-8 rounded-2xl border border-violet-900/30 hover:border-violet-700/50 transition-colors">
                <div className="w-12 h-12 bg-violet-900/50 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-violet-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-violet-100">
                  Export Anywhere
                </h3>
                <p className="text-violet-300">
                  Download your creations in multiple formats. PNG, SVG, and
                  more to fit any use case.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-violet-100">
              Ready to Create?
            </h2>
            <p className="text-xl text-violet-300 mb-10">
              Start sketching in seconds. No account required.
            </p>
            <Link
              href="/demo"
              className="inline-block px-10 py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-xl transition-all hover:scale-105 shadow-lg shadow-violet-600/30"
            >
              Open Editor
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-violet-900/30">
        <div className="max-w-6xl mx-auto text-center text-violet-400">
          <p>Built with passion for creators</p>
        </div>
      </footer>
    </div>
  );
}
