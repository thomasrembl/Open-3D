import { NavbarRoutes } from "@/components/navrbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="h-[80px] bg-white flex  w-full items-center py-1.5 px-5 rounded-md">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
