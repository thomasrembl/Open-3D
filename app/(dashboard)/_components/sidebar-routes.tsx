"use client";

import { BarChart, Compass, Home, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Home,
    label: "Accueil",
    href: "/",
  },
  {
    icon: Compass,
    label: "Découvrir",
    href: "/search",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
];
const teacherRoutes = [
  {
    icon: List,
    label: "Cours",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Statistiques",
    href: "/teacher/analytics",
  },
];

export const SiderbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full gap-5">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
