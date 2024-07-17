"use client";

import { ConfirmModal } from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { on } from "events";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  disabled?: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoaded(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoaded(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoaded(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Chapitre dépublié");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );

        toast.success("Chapitre publié");
      }
      router.refresh();
    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2 ">
      <Button
        onClick={onClick}
        disabled={disabled || isLoaded}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Dépublier" : "Publier"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" variant={"destructive"} disabled={isLoaded}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
