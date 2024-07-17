"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  items: Chapter[];
  onReorder: (upadateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChapterList = ({ items, onReorder, onEdit }: ChapterListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const upadatedChapter = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = upadatedChapter.map((chapter, index) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));
    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-paris-m-200 border-paris-m-300 border text-cod-gray-950 rounded-md mb-4 text-sm",
                      chapter.isPublished &&
                        "bg-blue-ribbon-300 border-blue-ribbon-700 "
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-paris-m-300 hover:bg-paris-m-300 rounded-l-md transition",
                        chapter.isPublished &&
                          "bg-blue-ribbon-300 border-r-blue-ribbon-700 hover:bg-blue-ribbon-400"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-paris-m-500 hover:bg-paris-m-700 cursor-default",
                          chapter.isPublished &&
                            "bg-blue-ribbon-500 hover:bg-blue-ribbon-400"
                        )}
                      >
                        {chapter.isPublished ? "Publié" : "Brouillion"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="w-4 h_4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
