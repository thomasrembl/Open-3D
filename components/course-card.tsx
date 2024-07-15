import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { Bookmark } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLenght: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLenght,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm bg-white transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <p className="text-ld md:text-base text-cod-gray-950 font-manrope font-normal group-hover:text-blue-ribbon-500 transition line-clamp-2">
            {title}
          </p>
          <p className="text-xs text-blue-ribbon-300">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={Bookmark} />
              <span className="font-manrope text-blue-ribbon-950">
                {chaptersLenght}{" "}
                {chaptersLenght === 1 ? "Chapitre" : "Chapitres"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              size="sm"
              variant={progress === 100 ? "success" : "default"}
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-manrope  text-blue-ribbon-950">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
