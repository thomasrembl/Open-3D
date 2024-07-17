import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { CoursesList } from "@/components/courses-list";
import { getAllCourses } from "@/actions/get-all-courses";

interface SerchpageProps {
  searchParams: {
    categoryId: string;
    title: string;
  };
}

const Serchpage = async ({ searchParams }: SerchpageProps) => {
  const { userId } = auth();

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!userId) {
    const allCourses = await getAllCourses(searchParams);
    return (
      <div className="">
        <div className=" space-y-4 pt-4 h-[86vh] overflow-scroll md:ml-0 ml-[10px] scrollbar-hidden">
          <div className="py-6 md:hidden md:mb-0 block ">
            <SearchInput />
          </div>
          <Categories items={categories} />
          <CoursesList items={allCourses} />
        </div>
      </div>
    );
  }

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <div className="">
      <div className=" space-y-4 pt-4 h-[86vh] overflow-scroll md:ml-0 ml-[10px] scrollbar-hidden">
        <div className="py-6 md:hidden md:mb-0 block ">
          <SearchInput />
        </div>
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </div>
  );
};

export default Serchpage;
