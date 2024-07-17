"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2   px-5 w-full text-white-50 text-lg font-medium rounded-xl transition-all  hover:bg-blue-ribbon-400",
        isActive && " bg-blue-ribbon-700 hover:bg-blue-ribbon-700"
      )}
    >
      <div className=" flex items-center gap-x-2 py-4">
        <Icon size={22} className="text-white-50" />
        <p className="font-normal font-manrope">{label}</p>
      </div>
    </button>
  );
};
