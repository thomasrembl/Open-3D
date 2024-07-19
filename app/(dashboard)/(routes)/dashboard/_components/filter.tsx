"use client";

import { useState } from "react";
import { CoursesList } from "@/components/courses-list";
import InfoCard from "./info-card";
import { CheckCircle2, Clock } from "lucide-react";

interface FilterProps {
  completedItems: any[];
  inProgressItems: any[];
  allCoursItems: any[];
  progressLength: number;
  completedLength: number;
}

const Filter = ({
  completedItems,
  inProgressItems,
  allCoursItems,
  progressLength,
  completedLength,
}: FilterProps) => {
  const [coursItems, setCoursItems] = useState(allCoursItems);

  const onProgress = () => {
    if (coursItems === allCoursItems || coursItems === completedItems) {
      setCoursItems(inProgressItems);
    } else {
      setCoursItems(allCoursItems);
    }
  };

  const onCompleted = () => {
    if (coursItems === allCoursItems || coursItems === inProgressItems) {
      setCoursItems(completedItems);
    } else {
      setCoursItems(allCoursItems);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div onClick={onProgress}>
          <InfoCard
            icon={Clock}
            label="En Cours"
            numberOfitems={progressLength}
            variant="edit"
          />
        </div>
        <div onClick={onCompleted}>
          <InfoCard
            icon={CheckCircle2}
            label="Terminé"
            numberOfitems={completedLength}
            variant="success"
          />
        </div>
      </div>
      <CoursesList items={coursItems} />
    </div>
  );
};

export default Filter;
