import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed top-[10px] left-[10px] hidden md:flex h-[97.5vh] min-w-[254px] w-[254px] flex-col  items-stretch  inset-y-0 z-50">
        <Sidebar />
      </div>
      <div className="">
        <div className="h-[80px] md:pr-[10px] left-[10px] md:left-0 pr-[20px] md:pl-[274px] fixed inset-y-[10px] w-full ">
          <Navbar />
        </div>
        <main className=" pr-[10px]  md:pl-[274px] pt-[100px] h-full  ">
          <div className="h-[86vh] overflow-scroll scrollbar-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
