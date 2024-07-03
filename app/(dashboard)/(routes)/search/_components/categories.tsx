"use client";

import { Category } from "@prisma/client";
import { SprayCan, Shovel, Film, Building2, User, Cat } from "lucide-react";
import { ComponentType, SVGProps } from "react";
import { CategoryItem } from "./category-item";
interface CategoriesProps {
  items: Category[];
}
type IconType = ComponentType<SVGProps<SVGSVGElement>>;
const iconMap: Record<Category["name"], IconType> = {
  Objet: SprayCan,
  Decors: Building2,
  Animation: Film,
  Personnage: User,
  Texture: Shovel,
};
export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
