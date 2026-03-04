//NOTE: AI made
import Link from "next/link";

interface AuthModalProps {
  type: "signin" | "signup";
}

export default async function AuthModal({ type }: AuthModalProps) {
  const isSignin = type === "signin";

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-md p-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">
            {isSignin ? "Welcome Back" : "Create your account"}
          </h3>
          <p className="text-sm text-base-content/60">
            {isSignin
              ? "Sign in to continue"
              : "Join and start building with us"}
          </p>
        </div>

        {/* Form */}
        <div className="mt-6 flex flex-col gap-4">
          {!isSignin && (
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />

          <button className="btn btn-primary w-full mt-2">
            {isSignin ? "Sign In" : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="divider text-xs text-base-content/50">OR</div>

          {/* Google Button */}
          <button className="btn w-full bg-white text-black border border-base-300 hover:bg-gray-50 flex items-center gap-3">
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>

            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-sm mt-2 text-base-content/70">
            {isSignin ? (
              <>
                Don’t have an account?{" "}
                <Link href="/auth/signup" className="link link-primary">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/auth/signin" className="link link-primary">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </dialog>
  );
}
