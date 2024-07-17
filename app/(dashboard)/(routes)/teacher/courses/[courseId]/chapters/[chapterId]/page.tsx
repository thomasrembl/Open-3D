import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, List, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { Banner } from "@/components/Banner";
import { ChapterActions } from "./_components/chapter-actions";
import { ChapterContentForm } from "./_components/chapter-content-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl || !chapter.isVideo,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  let divHeight = "86vh";
  if (!chapter.isPublished) {
    divHeight = "78.5vh";
  }

  return (
    <>
      {!chapter.isPublished && <Banner label="Ce chapitre n'est pas publié." />}
      <div
        style={{ height: divHeight }}
        className="p-6 overflow-scroll scrollbar-hidden"
      >
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <p className="font-manrope">Retour au paramètres du cours</p>
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-semibold font-poppins">
                  Paramètre du Chapitre
                </h1>
                <span className="text-sm text-white-500">
                  Compléter tout les champs {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge variant={"edit"} icon={LayoutDashboard} />
                <h2 className="text-xl font-poppins">
                  Customisez votre Chapitre
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} variant={"edit"} />
                <h2 className="text-xl font-poppins">Paramètre d&apos;accès</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={List} variant={"edit"} />
                <h2 className="text-xl font-poppins">Contenu</h2>
              </div>
              <ChapterContentForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            {chapter.isVideo && (
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Video} variant={"edit"} />
                  <h2 className="text-xl font-poppins">Ajoutez une vidéo</h2>
                </div>
                <ChapterVideoForm
                  initialData={chapter}
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
