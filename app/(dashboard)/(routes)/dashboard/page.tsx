import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs";
import { CheckCircle2, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";

const DashboardPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("login");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="En Cours"
          numberOfitems={coursesInProgress.length}
          variant="default"
        />
        <InfoCard
          icon={CheckCircle2}
          label="Terminé"
          numberOfitems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
};

export default DashboardPage;
