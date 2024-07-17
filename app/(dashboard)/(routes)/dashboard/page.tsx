import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle2, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";
import Filter from "./_components/filter";

const DashboardPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("login");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  const allCoursItems = [...coursesInProgress, ...completedCourses];
  const inProgressItems = [...coursesInProgress];
  const completedItems = [...completedCourses];
  const progressLength = coursesInProgress.length;
  const completedLength = completedCourses.length;

  return (
    <div className="p-6 h-[86vh] overflow-scroll md:ml-0 ml-[10px] scrollbar-hidden">
      <Filter
        allCoursItems={allCoursItems}
        inProgressItems={inProgressItems}
        completedItems={completedItems}
        progressLength={progressLength}
        completedLength={completedLength}
      />
    </div>
  );
};

export default DashboardPage;
