export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Sketcha
          </h1>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#workflow" className="hover:text-white transition">
              Workflow
            </a>
            <a href="#collaboration" className="hover:text-white transition">
              Collaboration
            </a>
          </nav>

          <a
            href="/app"
            className="rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white hover:from-purple-500 hover:to-indigo-500 transition"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-6 py-28 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Sketch Ideas.
            <span className="block mt-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Collaborate Instantly.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-neutral-400 text-lg">
            Sketcha is a collaborative whiteboarding platform inspired by
            Excalidraw—built from the ground up for real-time teamwork,
            low-latency syncing, and distraction-free creativity.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/app"
              className="rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-base font-semibold text-white hover:from-purple-500 hover:to-indigo-500 transition"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="rounded-md border border-neutral-700 px-6 py-3 text-base font-medium text-neutral-300 hover:border-neutral-500 hover:text-white transition"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-24 grid gap-16 md:grid-cols-3">
          <ValueStat
            title="Real-Time Sync"
            description="Every stroke appears instantly across all collaborators."
          />
          <ValueStat
            title="Zero Friction"
            description="No installs. No complexity. Start collaborating immediately."
          />
          <ValueStat
            title="Collaboration-First"
            description="Designed around presence, sessions, and shared intent."
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-neutral-800 bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h3 className="text-3xl font-semibold text-center">
            Everything You Need to Think Visually
          </h3>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            <FeatureCard
              title="Live Multiplayer Canvas"
              description="Multiple users draw simultaneously with consistent state and minimal latency."
            />
            <FeatureCard
              title="Simple, Expressive Tools"
              description="Shapes, freehand drawing, arrows, and text—nothing more than what you need."
            />
            <FeatureCard
              title="Room-Based Collaboration"
              description="Create or join sessions instantly using shareable room links."
            />
            <FeatureCard
              title="Presence Awareness"
              description="See who is active, where they are working, and what they are doing."
            />
            <FeatureCard
              title="Performance Optimized"
              description="Engineered to feel responsive even on slower connections."
            />
            <FeatureCard
              title="Minimal UI Philosophy"
              description="The canvas stays central. The interface stays out of your way."
            />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-semibold">
              A Natural Collaboration Workflow
            </h3>
            <p className="mt-4 text-neutral-400 text-lg">
              Sketcha is designed around how teams actually think—fast ideation,
              shared context, and continuous feedback.
            </p>

            <ol className="mt-8 space-y-4 text-neutral-300">
              <li>1. Create a room</li>
              <li>2. Share the link</li>
              <li>3. Sketch together in real time</li>
              <li>4. Iterate and refine ideas instantly</li>
            </ol>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-gradient-to-br from-purple-950/60 to-neutral-900 p-10">
            <p className="text-neutral-300">
              “The goal is not just drawing—it’s shared understanding.”
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              — Sketcha Design Philosophy
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section
        id="collaboration"
        className="border-t border-neutral-800 bg-neutral-900"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h3 className="text-3xl font-semibold">
            Built for Teams, Classrooms, and Creators
          </h3>
          <p className="mt-6 max-w-2xl mx-auto text-neutral-400 text-lg">
            Whether you are designing systems, teaching concepts, or brainstorming
            product ideas, Sketcha keeps everyone aligned in the same visual space.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h3 className="text-4xl font-bold">
            Start Collaborating in Seconds
          </h3>
          <p className="mt-6 text-neutral-400 text-lg">
            No setup. No friction. Just open a canvas and think together.
          </p>

          <div className="mt-10">
            <a
              href="/app"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:from-purple-500 hover:to-indigo-500 transition"
            >
              Get Started with Sketcha
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <span>© {new Date().getFullYear()} Sketcha</span>
          <span>Collaborate. Sketch. Create.</span>
        </div>
      </footer>
    </main>
  );
}

/* Components */

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-neutral-400">{description}</p>
    </div>
  );
}

function ValueStat({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
        {title}
      </h4>
      <p className="mt-2 text-neutral-400">{description}</p>
    </div>
  );
}

