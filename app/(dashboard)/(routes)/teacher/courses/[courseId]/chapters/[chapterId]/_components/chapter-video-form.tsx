"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import { Chapter, MuxData } from "@prisma/client";

import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };

  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const extractYouTubeVideoId = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const ytUrl = initialData.videoUrl
    ? `https://www.youtube.com/embed/${initialData.videoUrl}`
    : "";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const videoId = extractYouTubeVideoId(values.videoUrl);
      if (!videoId) {
        toast.error("Invalid YouTube URL");
        return;
      }
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        videoUrl: videoId,
      });
      toast.success("Chapter updated");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-sm p-4">
      <div className="fond-medium flex items-center justify-between">
        Course Video
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Video
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit a Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60  bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <iframe
              className="h-full w-full"
              src={ytUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      {isEditing && (
        <div>
          {/* <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          /> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Coller votre lien youtube'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Enregistrer
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter video
          </div>
        </div>
      )}
    </div>
  );
};
