import Link from "next/link";

interface AuthModalProps {
  type: "signin" | "signup";
}

export default async function AuthModal({ type }: AuthModalProps) {
  const isSignin = type === "signin";

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-md">
        <h3 className="text-lg font-bold text-center">
          {isSignin ? "Sign In" : "Create an Account"}
        </h3>

        <div className="mt-6 flex flex-col gap-4">
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

          <button className="btn btn-primary w-full">
            {isSignin ? "Sign In" : "Sign Up"}
          </button>

          <div className="divider">OR</div>

          <button className="btn btn-outline w-full">
            Continue with Google
          </button>

          <p className="text-center text-sm">
            {isSignin ? (
              <>
                Don't have an account?{" "}
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

        <div className="modal-action">
          <Link href="/" className="btn">
            Close
          </Link>
        </div>
      </div>
    </dialog>
  );
}
