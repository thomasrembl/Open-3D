import { getAllCourses } from "@/actions/get-all-courses";
import { CoursesList } from "@/components/courses-list";
import { GuestCourseList } from "@/components/guest-course-list";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  searchParams: {
    categoryId: string;
    title: string;
  };
}
const Home = async ({ searchParams }: HomeProps) => {
  const allCourses = await getAllCourses(searchParams);
  const homeCours = allCourses.slice(0, 4);
  return (
    <div className="overflow-scroll scrollbar-hidden w-full h-[85vh] pb-10">
      <div className="flex flex-col gap-5 mt-5 md:pl-0] pl-[10px]">
        <h1 className="font-poppins text-[22px] md:text-5xl text-cod-gray-950 font-semibold">
          De nouvelles compétences à porté de bras
        </h1>
        <div
          className="w-full md:h-[250px] md:p-0 relative rounded-md flex sm:justify-start items-center justify-center self-stretch min-h-[250px] overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/homepage.jpg')" }}
        >
          <div className="ml-0 bg-paris-m-500  rounded-md p-5 flex flex-col gap-5 sm:ml-[10%]">
            <h2 className="font-poppins text-3xl text-white font-semibold max-w-[233px]">
              La 3D sous tous ses angles
            </h2>
            <Link href="/search">
              <Button>Voir les cours</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-poppins text-cod-gray-950 text-2xl ">
            Nos derniers cours
          </h2>
          <div>
            <GuestCourseList items={homeCours} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
