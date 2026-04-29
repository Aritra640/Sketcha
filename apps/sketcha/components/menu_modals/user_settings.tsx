"use client";

import { useAtom } from "jotai";
import { userDataAtom, userSettingsAtom } from "../../store/state/state";

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
              "https://ui-avatars.com/api/?name=" + encodeURIComponent(alt);
          }}
        />
      </div>
    </div>
  );
}

export function UserSettingsModal() {
  const [modal, setModal] = useAtom(userSettingsAtom);
  const [userData] = useAtom(userDataAtom);

  if (!userData) return null;
  if (!modal) return null;

  function AvatarComponent() {
    if (userData.avatarURL === undefined) {
      if (userData.name === undefined) {
        return null;
      }
      return <Avatar letter={userData.name?.[0]?.toUpperCase() ?? "U"} />;
    } else {
      return (
        <ImageAvatar url={userData.avatarURL!} alt={userData.name ?? "User"} />
      );
    }
  }

  const username = userData.name === undefined ? "AvatarName" : userData.name;
  const useremail =
    userData.email === undefined ? "AvatarEmail" : userData.email;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-2xl bg-menu shadow-2xl border border-white/10 p-6 animate-in zoom-in-95 duration-200"
      >
        <div className="p-1.5 flex justify-center">
          <AvatarComponent />
        </div>

        <div className="pt-3 font-mono text-sm flex justify-center">{username}</div>
        <div className="font-mono text-sm flex justify-center">{useremail}</div>
        <div className="font-mono text-sm flex justify-center">
          Joined at{" "}
          {userData.joinedAt
            ? new Date(userData.joinedAt).toLocaleString()
            : "Unknown"}
        </div>

        <div className="pt-5 flex justify-center">
          <button className="btn btn-soft bg-selectedtool hover:bg-collab rounded-sm">
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
