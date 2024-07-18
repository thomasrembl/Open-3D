import Link from "next/link";
import { Logo } from "./logo";
import { SiderbarRoutes } from "./sidebar-routes";
import { Footer } from "./footer";

export const Sidebar = () => {
  return (
    <div className="h-full  sm:rounded-md rounded-0 flex flex-col justify-between items-center bg-blue-ribbon-500 py-12">
      <div className="flex flex-col gap-8 w-[12.1875rem]">
        <div>
          <Logo />
        </div>
        <div className="flex flex-col w-full">
          <SiderbarRoutes />
        </div>
      </div>
      <div className="w-full flex flex-row pt-7 px-5  justify-between items-start border-t border-blue-ribbon-700">
        <div className="flex flex-col gap-2">
          <a href="https://www.thomasremblier.fr" target="_blank">
            <p className="font-light text-xs text-white-50 hover:underline font-manrope">
              © 2024 Thomas Remblier
            </p>
          </a>
          <a href="https://normandiewebschool.fr/" target="_blanck">
            <p className="font-light text-xs text-white-50 hover:underline font-manrope">
              Travail pédagogique sans but commercial
            </p>
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
};
