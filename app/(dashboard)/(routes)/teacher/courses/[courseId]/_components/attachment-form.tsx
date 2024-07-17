"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };

  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toggleEditing = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Cours mis à jour");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Ressource supprimée");
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="mt-6  bg-white rounded-sm p-4">
      <div className="fond-medium flex items-center justify-between">
        <p className="">Ressources</p>
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing && <>Annuler</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un fichier
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 font-manrope text-white-500 italic">
              Pas de fichier pour le moment
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-blue-ribbon-100 border-blue-ribbon-400 border text-blue-ribbon-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-4 w-4 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="coursAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            <p>Ajouter n&apos;importe quel fichier pour votre cours</p>
          </div>
        </div>
      )}
    </div>
  );
};
