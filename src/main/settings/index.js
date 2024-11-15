import React from "react";
import SideBar from "./SideBar";
import { ManageAccounts } from "@mui/icons-material";

const Settings = () => {
  const modules = [
    {
      menu: "Account",
      menuIcon: <ManageAccounts />,
      hasSubMenu: true,
      subMenus: [
        { subMenu: "General", route: "/settings/account/user" },
        { subMenu: "Security", route: "/settings/account/security" },
      ],
    },
    {
      menu: "Integations",
      menuIcon: <ManageAccounts />,
      hasSubMenu: true,
      subMenus: [
        { subMenu: "General", route: "/settings/account/user" },
        { subMenu: "Security", route: "/settings/account/security" },
      ],
    },
  ];

  return (
    <div>
      <SideBar modules={modules} />
    </div>
  );
};

export default Settings;
