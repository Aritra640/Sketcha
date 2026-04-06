"use client";

import { LogOut } from "lucide-react";
import { MenuFeature } from "../menu/menu_feature_menu/menu_feature_button";
import { authClient } from "@repo/db_auth_service/client";
import { redirect } from "next/navigation";

export function LogoutButton() {
  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  }

  return (
    <div onClick={handleLogout} className="w-full p-4">
      <MenuFeature name="log out" icon={<LogOut />} />
    </div>
  );
}
