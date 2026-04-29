"use client";

import { useAtom } from "jotai";
import {
  addNewCanvasAtom,
  canvasSettingsAtom,
  collabAtom,
  shareAtom,
  userDataAtom,
  userSettingsAtom,
  yourCanvasesAtom,
} from "../../store/state/state";
import { MenuFeature } from "./menu_feature_menu/menu_feature_button";
import {
  LogOut,
  Paintbrush2,
  Palette,
  Settings,
  Share2,
  Share,
  Settings2,
  Plus,
} from "lucide-react";
import { LogoutButton } from "../auth/logout";
import { YourCanvasesModal } from "../menu_modals/your_canvases";
import { ShareModal } from "../menu_modals/share";
import { UserSettingsModal } from "../menu_modals/user_settings";
import { CanvasSettingsModal } from "../menu_modals/canvas_settings";
import { AddCanvasModal } from "../menu_modals/new_canvas";

export function SignedMenuContent() {
  const [user] = useAtom(userDataAtom);
  console.log("SignedMenuContent: ", user);
  const [collab, setCollab] = useAtom(collabAtom);

  const [yourCanvas, setYourCanvas] = useAtom(yourCanvasesAtom);
  const [share, setShare] = useAtom(shareAtom);
  const [addCanvas, setAddCanvas] = useAtom(addNewCanvasAtom);
  const [userSettings, setUserSettings] = useAtom(userSettingsAtom);
  const [canvasSettings, setCanvasSettings] = useAtom(canvasSettingsAtom);

  return (
    <div>
      <AddCanvasModal />
      <YourCanvasesModal />
      <ShareModal />
      <UserSettingsModal />
      <CanvasSettingsModal />
      <div className="p-2 w-full h-full flex flex-col justify-between">
        <div className="w-full">
          <br />
          <div className="pt-3.5 w-full">
            <MenuFeature
              name="New sketch"
              icon={<Plus />}
              onClick={() => setAddCanvas(!addCanvas)}
            />
          </div>
          <div className="pt-3.5 w-full">
            <MenuFeature
              name="Sketcha library"
              icon={<Palette />}
              onClick={() => setYourCanvas(!yourCanvas)}
            />
          </div>
          <div className="pt-3.5 w-full">
            <MenuFeature
              name="canvas settings"
              icon={<Settings2 />}
              onClick={() => setCanvasSettings(!canvasSettings)}
            />
          </div>
          <div className="pt-3 w-full">
            <MenuFeature
              name="share"
              icon={<Share />}
              onClick={() => setShare(!share)}
            />
          </div>
          <div className="pt-3 w-full">
            <MenuFeature
              name="collaborate"
              icon={<Share2 />}
              onClick={() => setCollab(!collab)}
            />
          </div>
          <div className="pt-3.5 w-full">
            <MenuFeature
              name="user settings"
              icon={<Settings />}
              onClick={() => setUserSettings(!userSettings)}
            />
          </div>
        </div>

        <div className="w-full">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
