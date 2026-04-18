"use client";

import { useAtom } from "jotai";
import { menuAtom, userDataAtom } from "../../store/state/state";
import { AuthButton } from "../auth/button";
import { SignedMenuContent } from "./signed_menu_content";
import { CurrentCanvasInformation } from "./current_canvas/canvas_details";

function Avatar({ letter }: { letter: string }) {
  return (
    <div className="avatar">
      <div className="w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
        {letter}
      </div>
    </div>
  );
}

function ImageAvatar({ url, alt }: { url: string; alt: string }) {
  return (
    <div className="avatar">
      <div className="w-20 rounded-full overflow-hidden shadow-lg ring-2 ring-slate-700">
        <img
          src={url}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(alt);
          }}
        />
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

function CloseMenu() {
  const [menu, setMenu] = useAtom(menuAtom);

  return (
    <button
      onClick={() => setMenu(!menu)}
      className="btn bg-selectedtool hover:bg-collab text-white rounded-xl md:hidden"
    >
      Close
    </button>
  );
}

function GuestUserAdvertisement() {
  return (
    <div className="w-full pt-5 mt-6 rounded-xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-5 shadow-lg hover:border-slate-700 transition">
      <div className="mb-5">
        <h2 className="text-sm text-center font-semibold text-slate-100">
          Unlock the full experience
        </h2>

        <p className="text-xs text-center text-slate-400 mt-1 leading-relaxed">
          Create an account to save your work and collaborate with others.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <Feature icon="💾" text="Save your canvases" />
        <Feature icon="🤝" text="Collaborate with teammates" />
        <Feature icon="☁️" text="Access your work anywhere" />
      </div>

      <AuthButton />
    </div>
  );
}

export function MenuContent() {
  const [userData] = useAtom(userDataAtom);

  const isGuest = userData.isGuest;
  const username = isGuest ? userData.GuestName : userData.name;
  const isAvatarNull = !userData.avatarURL;

  return (
    <div className="w-full h-full px-5 py-8 flex flex-col items-center">
      {isAvatarNull ? (
        <Avatar letter={username?.[0]?.toUpperCase() ?? "U"} />
      ) : (
        <ImageAvatar
          url={userData.avatarURL!}
          alt={username ?? "User"}
        />
      )}

      <div className="mt-4 text-lg font-mono text-slate-200">
        {username}
      </div>

      {isGuest ? (
        <span className="text-xs text-slate-500 mt-1">
          Guest session
        </span>
      ) : (
        <span className="text-xs text-slate-500 mt-1">
          Signed user
        </span>
      )}

      {isGuest ? (
        <GuestUserAdvertisement />
      ) : (
        <>
          <div className="pt-8 w-full">
            <div className="w-full flex justify-center items-center">
              <CurrentCanvasInformation />
            </div>
            <div className="p-2 text-xs text-center font-mono text-slate-500">
              canvas name, click to update
            </div>
          </div>

          <SignedMenuContent />
        </>
      )}

      <div className="md:hidden pt-20">
        <CloseMenu />
      </div>
    </div>
  );
}
