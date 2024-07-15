"use client";
import { cn } from "@/lib/utils";
import { ComponentType, SVGProps, use } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
interface CategoryItemProps {
  label: string;
  value?: string;
  icon: IconType;
}

export const CategoryItem = ({
  label,
  icon: Icon,
  value,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-cod-gray-200 rounded-full flex items-center gap-x-1 hover:border-blue-ribbon-400 transition",
        isSelected &&
          "border-blue-ribbon-400 bg-blue-ribbon-200 text-blue-ribbon-700"
      )}
      typeof="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate text-manrope font-light">{label}</div>
    </button>
  );
};
