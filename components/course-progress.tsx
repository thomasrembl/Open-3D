import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  variant?: "default" | "success" | "coursSuccess";
  size?: "default" | "sm";
  value: number;
}

const colorByVariant = {
  default: "text-blue-ribbon-500",
  success: "text-emerald-500",
  coursSuccess: "text-emerald-300",
};
const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ variant, size, value }: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-manrope mt-2 text-blue-ribbon-500",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Completé
      </p>
    </div>
  );
};

export default CourseProgress;
