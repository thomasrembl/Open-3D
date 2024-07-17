"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, LockIcon, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const Icon = isLocked ? LockIcon : isCompleted ? CheckCircle2 : PlayCircle;

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      typeof="button"
      className={cn(
        "flex items-center rounded-xl gap-x-2 text-white text-sm font-[500] pl-6 transition-all hover:bg-blue-400",
        isActive && " bg-blue-ribbon-700 hover:bg-blue-ribbon-700",
        isCompleted && "bg-emerald-700 hover:bg-emerald-500",
        isCompleted && isActive && "bg-emerald-500"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className="text-white" />
        <p className="font-normal font-manrope">{label}</p>
      </div>
    </button>
  );
};

export default CourseSidebarItem;
