import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-progress";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    if (!course) {
      return redirect("/");
    }
    return (
      <div className="h-full">
        <div className="fixed top-[10px] left-[10px] hidden md:flex h-[97.5vh] min-w-[320px] w-[320px] flex-col  items-stretch  inset-y-0 z-51">
          <CourseSidebar course={course} />
        </div>
        <div className="z-10">
          <div className="z-50 h-[80px] md:r-[10px] left-[10px] md:left-0 md:pr-[10px]  pr-[20px] md:pl-[340px] fixed inset-y-[10px] w-full ">
            <CourseNavbar course={course} />
          </div>
          <main className=" pr-[10px] pl-[10px]   md:pl-[340px] pt-[100px] h-full ">
            {children}
          </main>
        </div>
      </div>
    );
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="fixed top-[10px] left-[10px] hidden md:flex h-[97.5vh] min-w-[320px] w-[320px] flex-col  items-stretch  inset-y-0 z-51">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <div className="z-10">
        <div className="z-50 h-[80px] md:r-[10px] left-[10px] md:left-0 md:pr-[10px]  pr-[20px] md:pl-[340px] fixed inset-y-[10px] w-full ">
          <CourseNavbar course={course} progressCount={progressCount} />
        </div>
        <main className=" pr-[10px] pl-[10px]  md:pl-[340px] pt-[100px] h-full ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CourseLayout;
