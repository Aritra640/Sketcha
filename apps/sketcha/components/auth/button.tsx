import Link from "next/link";

export function AuthButton() {
  return (
    <Link href="/auth/signup">
      <button className="btn w-full rounded-lg bg-selectedtool hover:bg-collab border-none text-white font-medium transition-all">
        Sign up
      </button>
    </Link>
  );
}
