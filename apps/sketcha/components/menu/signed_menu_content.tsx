import { useAtom } from "jotai";
import { userDataAtom } from "../../store/state/state";
import { MenuFeature } from "./menu_feature_menu/menu_feature_button";
import { LogOut, Paintbrush2, Palette, Settings, Share2 } from "lucide-react";

export function SignedMenuContent() {
  const [user] = useAtom(userDataAtom);
  const isSigned = user.isGuest;

  if (isSigned == false) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full">
        <br />
        <div className="pt-3 w-full">
          <MenuFeature name="collaborate" icon={<Share2 />} />
        </div>
        <div className="pt-3.5 w-full">
          <MenuFeature name="your canvases" icon={<Palette />} />
        </div>
        <div className="pt-3.5 w-full">
          <MenuFeature name="user settings" icon={<Settings />} />
        </div>
      </div>

      <div className="w-full">
        <div className="w-full p-4">
          <MenuFeature name="log out" icon={<LogOut />} />
        </div>
      </div>
    </div>
  );
}
