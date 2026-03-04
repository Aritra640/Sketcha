"use client";

import { useAtom } from "jotai";
import { userDataAtom, userModeAtom } from "../../store/state/state";
import { AuthButton } from "../auth/button";

function Avatar({ letter }: { letter: string }) {
  return (
    <div className="avatar">
      <div className="w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
        {letter}
      </div>
    </div>
  );
}


function Feature({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition">

      <div className="flex items-center justify-center w-7 h-7 rounded-md bg-slate-800 text-sm">
        {icon}
      </div>

      <span>{text}</span>

    </div>
  );
}

function GuestUserAdvertisement() {
  return (
    <div className="w-full mt-6 rounded-xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-5 shadow-lg hover:border-slate-700 transition">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-sm text-center font-semibold text-slate-100">
          Unlock the full experience
        </h2>

        <p className="text-xs text-center text-slate-400 mt-1 leading-relaxed">
          Create an account to save your work and collaborate with others.
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-3 mb-5">

        <Feature icon="💾" text="Save your canvases" />

        <Feature icon="🤝" text="Collaborate with teammates" />

        <Feature icon="☁️" text="Access your work anywhere" />

      </div>

      {/* CTA */}
      <AuthButton />
    </div>
  );
}

export function MenuContent() {
  const [userMode] = useAtom(userModeAtom);
  const [userData] = useAtom(userDataAtom);

  const isGuest = userMode === "guest";
  const username = isGuest ? userData.GuestName : userData.name;

  return (
    <div className="w-full px-5 py-8 flex flex-col items-center">
      <Avatar letter={username?.[0]?.toUpperCase() ?? "U"} />

      <div className="mt-4 text-sm font-mono text-slate-200">
        {username}
      </div>

      {isGuest && (
        <span className="text-xs text-slate-500 mt-1">
          Guest session
        </span>
      )}

      {isGuest && <GuestUserAdvertisement />}
    </div>
  );
}
