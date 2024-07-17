import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full z-50",
  {
    variants: {
      variant: {
        warning:
          "text-white rounded-md bg-lightning-yellow-700 border-lightning-yellow-700  ",
        success: "bg-emerald-700 border-emerald-700 text-white rounded-md ",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle2,
};

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      <p className="font-manrope">{label}</p>
    </div>
  );
};
