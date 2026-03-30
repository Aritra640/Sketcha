//TODO: AI generated

export default async function Page() {
  const isAuthenticated = false; // replace with your real auth check

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#111111] shadow-xl p-8">
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mb-2">
            Authentication Failed
          </h1>

          {/* Subtitle */}
          <p className="text-neutral-400 text-sm text-center mb-6">
            You are not authorized to access this page. Please log in again.
          </p>

          {/* Divider */}
          <div className="h-px bg-neutral-800 mb-6" />

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <a
              href="/auth/login"
              className="w-full text-center rounded-lg bg-white text-black py-2 font-medium hover:bg-neutral-200 transition"
            >
              Go to Login
            </a>

            <a
              href="www.google.com"
              className="w-full text-center rounded-lg border border-neutral-700 py-2 font-medium hover:bg-neutral-800 transition"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ✅ If authenticated, render actual content
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <h1 className="text-xl font-semibold">Welcome to Canvas</h1>
    </div>
  );
}
