import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  variant?: "edit" | "success";
  label: string;
  numberOfitems: number;
}

const InfoCard = ({
  variant,
  icon: Icon,
  numberOfitems,
  label,
}: InfoCardProps) => {
  return (
    <div className="bg-white rounded-md flex items-center gap-x-2 p-3 cursor-pointer hover:bg-white-100 ">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-poppins">{label}</p>
        <p className="text-cod-gray-950 font-manrope text-sm">
          {numberOfitems} {"cours"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
