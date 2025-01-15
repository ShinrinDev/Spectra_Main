import {
  HomeIcon,
  InformationCircleIcon,
  ServerStackIcon,
  TableCellsIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import { Key, Shield, Users } from 'lucide-react';

import { PermissionManagement } from "@/admin/PermissionManagement";
import { RoleManagement } from "@/admin/RoleManagement";
import { UserManagement } from "@/admin/UserManagement";
import { SignIn, SignUp } from "@/pages/auth";
import { Home, Notifications, Profile, Tables } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Clients",
        path: "/clients",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "---------Admin-------------------",
    layout: "admin",
    pages: [
      {
        icon: <Users {...icon} />,
        name: "users",
        path: "/users",
        element: <UserManagement />,
      },
      {
        icon: <Shield {...icon} />,
        name: "roles",
        path: "/roles",
        element: <RoleManagement />,
      },
      {
        icon: <Key {...icon} />,
        name: "permissions",
        path: "/permissions",
        element: <PermissionManagement />,
      },

    ],
  },
  {
    title: ".................................................",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Log Out",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        name: "",
        path: "/sign-up",
        element: <SignUp />,
      }
     
    ],
  },
];

export default routes;
