import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";
import { Footer } from "@/app/(dashboard)/_components/footer";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = auth();
  if (!userId) {
    return (
      <div className="h-full rounded-0 sm:rounded-md  flex flex-col justify-between items-center bg-blue-ribbon-500  py-12">
        <div className="flex flex-col gap-8 w-full ">
          <div className="flex flex-col border-b border-blue-ribbon-700 ">
            <h1 className="font-semibold font-poppins text-white text-xl px-5 mb-10">
              {course.title}
            </h1>
          </div>
          <div className="flex flex-col w-full px-5 gap-3">
            {course.chapters.map((chapter) => (
              <CourseSidebarItem
                key={chapter.id}
                id={chapter.id}
                label={chapter.title}
                isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                courseId={course.id}
                isLocked={!chapter.isFree}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-row pt-7 px-5  justify-between items-center border-t border-blue-ribbon-700">
          <a href="https://www.thomasremblier.fr" target="_blank">
            <p className="font-light text-xs text-white-50 hover:underline font-manrope">
              © 2024 Thomas Remblier
            </p>
          </a>
          <Footer />
        </div>
      </div>
    );
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="h-full  rounded-0 sm:rounded-md flex flex-col justify-between items-center bg-blue-ribbon-500  py-12">
      <div className="flex flex-col gap-8 w-full ">
        <div className="flex flex-col border-b border-blue-ribbon-700 ">
          <h1 className="font-semibold font-poppins text-white text-xl px-5 mb-10">
            {course.title}
          </h1>
          {purchase && (
            <div className="px-5 mb-10">
              <CourseProgress variant="coursSuccess" value={progressCount} />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full px-5 gap-3">
          {course.chapters.map((chapter) => (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-row pt-7 px-5  justify-between items-center border-t border-blue-ribbon-700">
        <a href="https://www.thomasremblier.fr" target="_blank">
          <p className="font-light text-xs text-white-50 hover:underline font-manrope">
            © 2024 Thomas Remblier
          </p>
        </a>
        <Footer />
      </div>
    </div>
  );
};

export default CourseSidebar;
