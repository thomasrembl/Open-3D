import { NavbarRoutes } from "@/components/navrbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="h-[80px]  flex bg-white w-full items-center py-1.5 px-5 rounded-md">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
