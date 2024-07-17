"use client";

import { ConfirmModal } from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled?: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoaded(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Cours supprimé");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setIsLoaded(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoaded(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Cours dépublié");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);

        toast.success("Cours publié");
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
