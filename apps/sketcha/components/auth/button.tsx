import { useRouter } from "next/navigation";

export function AuthButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("./auth/signup")}
      className="btn w-full rounded-lg bg-selectedtool hover:bg-collab border-none text-white font-medium transition-all"
    >
      Sign up
    </button>
  );
}
